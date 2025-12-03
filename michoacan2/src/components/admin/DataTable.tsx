'use client';

import React from 'react';
import Button from '@/components/shared/Button';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
}

export default function DataTable({ columns, data, onEdit, onDelete, onView }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
              >
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    {onView && (
                      <Button variant="outline" size="sm" onClick={() => onView(row)}>
                        View
                      </Button>
                    )}
                    {onEdit && (
                      <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="danger" size="sm" onClick={() => onDelete(row)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No data available</p>
        </div>
      )}
    </div>
  );
}
