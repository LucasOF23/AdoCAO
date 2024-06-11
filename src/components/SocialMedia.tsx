import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export type SocialMediaProps = {
  url_instagram: string;
  url_facebook: string;
  url_twitter: string;
};

export function SocialMedia({ url_instagram, url_facebook, url_twitter }: SocialMediaProps) {
  return (
    <div className="flex space-x-4">
      <a
        key={0}
        href={url_instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-gray-600 hover:text-blue-500"
      >
        <FaInstagram />
      </a>
      <a
        key={1}
        href={url_facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-gray-600 hover:text-blue-500"
      >
        <FaFacebook />
      </a>
      <a
        key={2}
        href={url_twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-gray-600 hover:text-blue-500"
      >
        <FaTwitter />
      </a>
    </div>
  );
}
