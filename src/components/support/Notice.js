import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function Notice() {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    AxiosUtil.send("GET", "/issuemoa/support/notice/list?pageSize=4", new FormData(), "", (e) => {
      console.log(e);
      const data = e.data;
      if (data !== undefined) {
        setNoticeList(data.list);
      }
    });
  }, []);

  return (
    <>
      <h3 className="fw-bold">Notice</h3>
      {noticeList.map((data, idx) => (
        <h5 className="text-break">- {data.title}</h5>
      ))}
    </>
  );
}

export default Notice;
