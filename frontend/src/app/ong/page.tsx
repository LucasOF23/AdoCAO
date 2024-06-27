"use client";

import AdoptionCard from "@/components/AdoptionCard";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Forms from "@/components/Forms";
import Navbar2 from "@/components/Navbar2";
import Sidebar from "@/components/Sidebar2";
import Lowerbar from "@/components/Lowerbar";
import { ProfileInfo } from "@/types/profile";
import { Route, Link, Routes, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export type OngPostProps = {
  info: ProfileInfo;
};

export default function ONGPosts({info}: OngPostProps) {
  const searchParams = new URLSearchParams(document.location.search)

  return (
    <div>Tutorial: {searchParams.get('id')}</div>
  )
}
