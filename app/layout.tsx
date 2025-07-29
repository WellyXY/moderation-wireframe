import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Moderation Dashboard',
  description: 'Video content moderation and recommendation algorithm management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="language" content="English" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force English locale for date inputs - More aggressive
              document.addEventListener('DOMContentLoaded', function() {
                // Force document language
                document.documentElement.lang = 'en-US';
                document.documentElement.setAttribute('lang', 'en-US');
                document.body.setAttribute('lang', 'en-US');
                
                function forceEnglishDates() {
                  const dateInputs = document.querySelectorAll('input[type="date"]');
                  dateInputs.forEach(input => {
                    input.setAttribute('lang', 'en-US');
                    input.setAttribute('data-locale', 'en-US');
                    input.style.direction = 'ltr';
                    input.style.writingMode = 'horizontal-tb';
                    
                    // Force value format
                    if (input.value) {
                      const date = new Date(input.value);
                      if (!isNaN(date.getTime())) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        input.value = year + '-' + month + '-' + day;
                      }
                    }
                  });
                }
                
                // Initial setup
                forceEnglishDates();
                
                // Watch for new date inputs
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                      forceEnglishDates();
                    }
                  });
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
                
                // Override navigator language
                try {
                  Object.defineProperty(navigator, 'language', {
                    get: function() { return 'en-US'; }
                  });
                  Object.defineProperty(navigator, 'languages', {
                    get: function() { return ['en-US', 'en']; }
                  });
                } catch (e) {
                  // Fallback for read-only properties
                  console.log('Cannot override navigator language');
                }
              });
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen" lang="en">
        {children}
      </body>
    </html>
  )
} 