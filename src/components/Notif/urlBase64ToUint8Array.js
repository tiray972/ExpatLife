'use client';

import { useState, useEffect } from 'react';

export default function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  let rawData;
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    // Utiliser window.atob dans le navigateur
    rawData = window.atob(base64);
  } else {
    // Utiliser Buffer pour Node.js
    rawData = Buffer.from(base64, 'base64').toString('binary');
  }

  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
