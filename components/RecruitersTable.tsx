"use client"
import * as React from "react";
import Link from "next/link";
import {
    ArrowUpDown,
    Check,
    Copy,
    ExternalLink,
} from "lucide-react";
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Utility function to copy text to clipboard
const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
};

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "company",
        header: "Company",
    }, {
        accessorKey: "city",
        header: "City",
    }, {
        accessorKey: "state",
        header: "State",
    }, {
        accessorKey: "country",
        header: "Country",
    }, {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            const [copied, setCopied] = React.useState(false);

            const handleCopy = () => {
                copyToClipboard(email);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            };

            return (
                <TooltipProvider>
                    <Tooltip>
                        {email && (
                            <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleCopy}>
                                    <span>{email}</span>
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </div>
                            </TooltipTrigger>
                        )}
                        <TooltipContent>
                            <p>{copied ? "Copied!" : "Click to copy"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        id: "linkedin-url",
        header: "LinkedIn Profile",
        cell: ({ row }) => {
            const { linkedinUrl } = row.original;
            return (
                <Link href={linkedinUrl || "#"} target="_blank" >
                    <Button variant={'ghost'} size={'icon'} className="cursor-pointer" >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </Link>
            )
        }
    },
];


interface RecruitersTableProps<TData, TValue> {
    data: TData[]
}

function RecruitersTable<TData, TValue>({
    data,
}: RecruitersTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    // Get unique values for select fields
    const getUniqueValues = (columnId: string) => {
        return Array.from(new Set(data.map((item: any) => item[columnId])))
    }

    const uniqueCountries = getUniqueValues('country')
    const uniqueCompanies = getUniqueValues('company')
    const uniqueCities = getUniqueValues('city')

    return (
        <div>
            <div className="flex flex-wrap gap-4 md:gap-2 items-center py-4">
                <Input
                    placeholder="Search by first name..."
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstName")?.setFilterValue(event.target.value)
                    }
                    className="flex-1 min-w-[200px]"
                />
                <Select
                    onValueChange={(value) =>
                        table.getColumn("country")?.setFilterValue(value === "all" ? "" : value)
                    }
                >
                    <SelectTrigger className="flex-1 min-w-[200px]">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {uniqueCountries.map((country) => (
                            <SelectItem key={country} value={country}>
                                {country}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        table.getColumn("company")?.setFilterValue(value === "all" ? "" : value)
                    }
                >
                    <SelectTrigger className="flex-1 min-w-[200px]">
                        <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Companies</SelectItem>
                        {uniqueCompanies.map((company) => (
                            <SelectItem key={company} value={company}>
                                {company}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        table.getColumn("city")?.setFilterValue(value === "all" ? "" : value)
                    }
                >
                    <SelectTrigger className="flex-1 min-w-[200px]">
                        <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {uniqueCities.map((city) => (
                            <SelectItem key={city} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center text-sm font-medium" >
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2" >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RecruitersTable;