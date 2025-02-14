import { Outlet } from 'react-router';
import Header from '../components/Header';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
