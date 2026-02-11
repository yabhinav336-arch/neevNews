import React from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
    title: string;
    url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="flex flex-row md:flex-col gap-4 fixed bottom-8 md:bottom-auto md:top-1/2 left-0 md:left-8 right-0 md:right-auto justify-center md:justify-start bg-white/90 dark:bg-secondary-900/90 backdrop-blur-sm p-3 rounded-full md:rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-800 z-40 transition-all duration-300 md:-translate-y-1/2">
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-colors"
                aria-label="Share on Twitter"
            >
                <Twitter size={20} />
            </a>
            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-full transition-colors"
                aria-label="Share on LinkedIn"
            >
                <Linkedin size={20} />
            </a>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-500 hover:text-[#1877F2] hover:bg-[#1877F2]/10 rounded-full transition-colors"
                aria-label="Share on Facebook"
            >
                <Facebook size={20} />
            </a>
            <button
                onClick={handleCopy}
                className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors relative"
                aria-label="Copy Link"
            >
                {copied ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
            </button>
        </div>
    );
};

export default ShareButtons;
