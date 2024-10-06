import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="p-4 text-left text-gray-600">Logo</TableHead>
                        <TableHead className="p-4 text-left text-gray-600">Name</TableHead>
                        <TableHead className="p-4 text-left text-gray-600">Date</TableHead>
                        <TableHead className="p-4 text-right text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-100 transition-colors">
                                <TableCell className="p-4">
                                    <Avatar className='w-16'>
                                        <AvatarImage className="object-cover" src={company.logo} alt={`${company.name} logo`} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="p-4 text-gray-800">{company.name}</TableCell>
                                <TableCell className="p-4 text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="p-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;
