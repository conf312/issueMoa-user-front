import React, { useEffect, useState } from 'react';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function FAQ() {
  const [faqList, setFAQList] = useState([]);

  useEffect(() => {
    AxiosUtil.send("GET", "/issuemoa/support/FAQ/list?pageSize=2", new FormData(), "", (e) => {
      const data = e.data;
      if (data !== undefined) {
        setFAQList(data.list);
      }
    });
  }, []);

  return (
    <>
      <h3 className="fw-bold">FAQ</h3>
      {faqList.map((data, idx) => (
        <h5 className="text-break">- {data.title}</h5>
      ))}
    </>
  );
}

export default FAQ;
