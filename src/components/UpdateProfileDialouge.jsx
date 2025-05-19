import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    
    const [fileName, setFileName] = useState(user?.profile?.resume ? "Resume uploaded" : "");
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setInput({ ...input, file });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        
        // Convert comma-separated skills to array
const skillsArray = input.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
formData.append("skills", JSON.stringify(skillsArray));

        if (input.file) {
            formData.append("file", input.file);
        } 

        const token = localStorage.getItem('token');
        formData.append('token', token);

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                withCredentials: true 
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success("Profile updated successfully!");
                setOpen(false);
            }
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-lg shadow-lg bg-white">
                <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                    <DialogTitle className="text-lg font-medium text-white">Update Profile</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="basic" className="max-h-96 overflow-y-auto">
                    <TabsList className="grid grid-cols-3 px-4 pt-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="details">Professional</TabsTrigger>
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                    </TabsList>
                    
                    <form onSubmit={submitHandler}>
                        <TabsContent value="basic" className="p-4 space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="fullName" className="text-xs font-medium text-gray-700">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={input.fullName}
                                        onChange={changeEventHandler}
                                        className="pl-8 h-9 text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="pl-8 h-9 text-sm"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <Label htmlFor="phoneNumber" className="text-xs font-medium text-gray-700">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="pl-8 h-9 text-sm"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="p-4 space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="bio" className="text-xs font-medium text-gray-700">Professional Bio</Label>
                                <Input
                                    as="textarea"
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="min-h-20 resize-none text-sm"
                                    placeholder="Brief description of your professional experience..."
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <Label htmlFor="skills" className="text-xs font-medium text-gray-700">Skills (comma-separated)</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="h-9 text-sm"
                                    placeholder="React, JavaScript, UI/UX Design"
                                />
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="resume" className="p-4">
                            <div className="space-y-2">
                                <Label htmlFor="file" className="text-xs font-medium text-gray-700">Upload Resume (PDF)</Label>
                                
                                <div className="mt-1">
                                    {fileName ? (
                                        <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-md">
                                            <div className="flex items-center">
                                                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                                <span className="text-xs text-gray-700 truncate">{fileName}</span>
                                            </div>
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => {
                                                    setFileName("");
                                                    setInput({ ...input, file: null });
                                                }}
                                                className="h-6 w-6 p-0 rounded-full"
                                            >
                                                <span className="sr-only">Remove file</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </Button>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="file"
                                            className="flex justify-center items-center px-4 py-3 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 bg-gray-50"
                                        >
                                            <div className="space-y-1 text-center">
                                                <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                                <div className="text-xs text-gray-500">
                                                    <span className="font-medium text-blue-600 hover:underline">Click to upload</span> or drag and drop
                                                </div>
                                                <p className="text-xs text-gray-500">PDF up to 10MB</p>
                                            </div>
                                            <Input
                                                id="file"
                                                name="file"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={fileChangeHandler}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        
                        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setOpen(false)}
                                className="h-8 text-sm"
                            >
                                Cancel
                            </Button>
                            
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="h-8 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                        Updating...
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog