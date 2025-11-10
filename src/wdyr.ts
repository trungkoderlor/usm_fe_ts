import React from 'react';

if (process.env.NODE_ENV === 'development') {
  // Tự làm hàm notifier để kiểm soát
  const notifier = (notification : any) => {
    // Lọc các thông báo từ RouterProvider
    if (notification.Component?.displayName?.includes('Router')) {
      return; // Bỏ qua thông báo
    }
    console.log('WDYR:', notification);
  };

  import('@welldone-software/why-did-you-render').then((wdyr) => {
    wdyr.default(React, {
      trackAllPureComponents: false,
      // Chỉ include các component bạn muốn theo dõi một cách rất cụ thể
      include: [/^UserTable$/, /^UserTableRow$/],
      // Exclude mọi component Router với regex chính xác hơn
      exclude: [/.+Provider$/, /^.+Router.+$/, /^Route/],
      // Sử dụng notifier tùy chỉnh
      notifier,
    });
  });
}