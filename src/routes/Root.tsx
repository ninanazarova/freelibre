import React, { useState } from 'react';

import BottomNavigation from '../components/BottomNavigation';

import { Outlet, useOutletContext } from 'react-router-dom';

function Root() {
  const [message, setMessage] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const handleShowAlert = (message: string, id: string) => {
    setMessage(message);
    setId(id);
  };

  return (
    <>
      <div id='main-section'>
        <Outlet context={{ message, id }} />
      </div>
      <BottomNavigation onShowAlert={handleShowAlert} />
    </>
  );
}

export function useMessage() {
  return useOutletContext<{ message: string | null }>();
}
export function useNewId() {
  return useOutletContext<{ id: string | null }>();
}

export default Root;
