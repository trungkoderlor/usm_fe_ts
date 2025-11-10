import React from 'react';

interface Props {
  onSortName?: () => void;
  onSortAddress?: () => void;
  nameSortOrder?: 'asc' | 'desc' | null;
  addressSortOrder?: 'asc' | 'desc' | null;
}

// UserTableHeader Component
const UserTableHeader: React.FC<Props> = ({ onSortName, onSortAddress, nameSortOrder, addressSortOrder }) => {
  const renderSortIcon = (sortOrder: 'asc' | 'desc' | null | undefined) => {
    if (sortOrder === 'asc') return '▲';
    if (sortOrder === 'desc') return '▼';
    return '↕';
  };

  return (
    <thead className='bg-gray-50'>
      <tr>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
        <th
          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100'
          onClick={onSortName}
          title='Click to sort by full name'
        >
          <div className='flex items-center gap-2'>
            <span>Full Name</span>
            <span className='text-xs text-gray-400'>{renderSortIcon(nameSortOrder)}</span>
          </div>
        </th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Gender</th>
        <th
          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100'
          onClick={onSortAddress}
          title='Click to sort by address'
        >
          <div className='flex items-center gap-2'>
            <span>Address</span>
            <span className='text-xs text-gray-400'>{renderSortIcon(addressSortOrder)}</span>
          </div>
        </th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
      </tr>
    </thead>
  );
};
export default React.memo(UserTableHeader);
