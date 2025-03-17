import React from 'react';
import './Issuemanagement.css';
import { FiSearch } from 'react-icons/fi';
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Package, Search } from "lucide-react";

const Issuemanagement = () => {
    const mockIssues = [
        { id: 1, title: "Course Registration Issue", category: "Registration", status: "Open", date: "2024-01-15" },
        { id: 2, title: "Missing Grades", category: "Academic", status: "In Progress", date: "2024-01-14" },
        { id: 3, title: "Login Problem", category: "Technical", status: "Resolved", date: "2024-01-13" },
    ];

    const getStatusClass = (status) => {
        switch(status.toLowerCase()) {
            case 'open': return 'status-open';
            case 'in progress': return 'status-in-progress';
            case 'resolved': return 'status-resolved';
            default: return '';
        }
    };

    return (
        <div className="issue-management">
            <div className="issue-header">
                <h1>Issue Management</h1>
            </div>
            
            <div className="issue-actions">
                <div className="search-bar">
                    <FiSearch size={20} color="#A3AED0"/>
                    <input type="text" placeholder="Search issues..." />
                </div>
                <button className="new-issue-btn">+ New Issue</button>
            </div>

            {/* <div className="issues-table">
                <div className="table-header">
                    <div>ID</div>
                    <div>Issue Title</div>
                    <div>Category</div>
                    <div>Status</div>
                    <div>Date</div>
                </div>
                {mockIssues.map(issue => (
                    <div key={issue.id} className="table-row">
                        <div>#{issue.id}</div>
                        <div>{issue.title}</div>
                        <div>{issue.category}</div>
                        <div>
                            <span className={`status-badge ${getStatusClass(issue.status)}`}>
                                {issue.status}
                            </span>
                        </div>
                        <div>{issue.date}</div>
                    </div>
                ))}
            </div> */}
            <Frame />
        </div>
    );
};

export default Issuemanagement;



export function Frame() {
  // Table headers data
  const tableHeaders = [
    { id: 1, label: "ISSUE", className: "text-left" },
    { id: 2, label: "STATUS", className: "text-center" },
    { id: 3, label: "CATEGORY", className: "text-center" },
    { id: 4, label: "DATE", className: "text-right" },
  ];

  return (
    <Card className="relative w-full max-w-[1053px] h-[745px] rounded-[20px] overflow-hidden border border-solid border-black">
      <CardContent className="p-5">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-semibold text-3xl tracking-[2.10px] font-['Poppins-SemiBold',Helvetica]">
            My Issues
          </h1>

          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                className="w-[548px] h-12 pl-6 rounded-[20px] border border-solid border-black font-['Poppins-Regular',Helvetica] text-xl"
                placeholder="Search for issues..."
              />
              <Search className="absolute w-[21px] h-[21px] top-3.5 right-4 opacity-60" />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              className="h-12 px-8 rounded-[10px] border border-solid border-black font-['Poppins-SemiBold',Helvetica] text-xl"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full">
          <div className="bg-[#ebebeb] rounded-[15px_15px_0px_0px] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="h-9">
                  {tableHeaders.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`font-semibold text-xl tracking-[1.40px] font-['Poppins-SemiBold',Helvetica] text-black ${header.className}`}
                    >
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>{/* Empty table body */}</TableBody>
            </Table>
          </div>

          {/* Horizontal Line */}
          <div className="w-full h-0.5 bg-black my-1"></div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center mt-16">
            <Package className="w-[237px] h-[188px] mb-10" />
            <p className="text-3xl text-center tracking-[0.63px] leading-[34px] font-['Poppins-Medium',Helvetica]">
              There are no pending issues added. Kindly click{" "}
              <span className="font-extrabold font-['Poppins-ExtraBold',Helvetica]">
                New Issue
              </span>{" "}
              to get started.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
