import React, { useEffect, useState } from 'react';

const injectStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .api-error-container {
      color: #0f172a;
      text-align: center;
      position: fixed;
      top: -6.25rem;
      width: 100%;
      height: 100%;
      background-color: #f9fafb;
        background-image:
    linear-gradient(to bottom, #faf5ff, #ecfeff),
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  background-blend-mode: multiply;
      z-index: 9999;
      margin-top: 6.25rem;
      padding: 2rem;
    }
    
    .error-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0;
    }

    .error-info {
      width: 75%; 
      font-size: 1rem;
      color: #64748b;
      margin: 0 auto;
      margin-top: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .error-list {
      list-style-type: none;
      padding: 0;
    }
    
    .error-item {
      padding: 1rem;
      background-color: #fff;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
      color: #64748b;
      text-align: left;
      display: grid;
      grid-template-columns: 40px 260px repeat(3, 1fr);
      gap: 1rem;
      align-items: start;
      margin-bottom: .75rem;
      overflow: hidden;
    }

    .error-item-idx {
      height: 100%;
      background-color: #fef2f2;
      color: #ef4444;
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .error-item-title {
      font-size: 1rem;
      font-weight: bold;
      color: #0f172a;
    }
    
    .detail-label {
      font-weight: 600;
      color: #0f172a;
    }
    
    .error-link {
      color: #7dd3fc;
    }

    .error-link:hover {
      color: #38bdf8;
    }
    
    .support-text {
      color: #64748b;
      margin: 0;
      margin-top: 6px;
      font-size: 0.875rem;
    }

    .support-text span {
      font-weight: 600;
    }
    
    .support-link {
      color: #7dd3fc;
      font-weight: 500;
    }

    .support-link:hover {
      color: #38bdf8;
    }

    @media (max-width: 1024px) {
      .error-item {
        grid-template-columns: 40px 1fr;
        grid-template-rows: auto;
        gap: 0.75rem;
        align-items: center;
      }

      .error-item > *:nth-child(n+3) {
        grid-column: 1 / -1;
      }

      .error-item-idx {
        height: 40px;
      }
    }
  `;
  document.head.appendChild(style);
};

const ApiKeyError = ({ missingKeys }) => {
  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div className="container api-error-container">
      <p className="error-title">The following API key(s) are missing</p>
      <p className="error-info">
        To fully experience the capabilities of KaibanJs, please configure the environment variables in the .env file by setting the keys listed below. This setup is essential to run the example successfully. If you have any questions or feedback, feel free to reach out to us.
      </p>
      <ul className="error-list">
        {missingKeys.map((key, idx) => (
          <li className="error-item" key={idx}>
            <div className="error-item-idx">{idx + 1}</div>
            <div className="error-item-title">{key.name}</div>
            <div>
              <span className="detail-label">Purpose:</span> {key.purpose}
            </div>
            <div>
              <span className="detail-label">Where to put it:</span> {key.projectLocation}
            </div>
            <div>
              <span className="detail-label">Get the value here:</span> <a href={key.valueLocation} target="_blank" className="error-link">{key.valueLocation}</a>
            </div>
          </li>
        ))}
      </ul>
      <p className="support-text">Please add the missing key(s) to continue.</p>
      <p className="support-text"><span>Need help?</span> Join our <a href="https://kaibanjs.com/discord" target="_blank" className="support-link">Discord support channel</a>.</p>
    </div>
  );
};

const DevUtils = () => {
  const [missingKeys, setMissingKeys] = useState([]);

  useEffect(() => {
    const keys = [];

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      keys.push({
        name: 'NEXT_PUBLIC_OPENAI_API_KEY',
        purpose: 'Used for generating AI responses and processing natural language queries.',
        projectLocation: 'In the .env file on the root of the project: NEXT_PUBLIC_OPENAI_API_KEY=your-api-key-value',
        valueLocation: 'https://platform.openai.com/account/api-keys'
      });
    }

    if (!process.env.NEXT_PUBLIC_TRAVILY_API_KEY) {
      keys.push({
        name: 'NEXT_PUBLIC_TRAVILY_API_KEY',
        purpose: 'Powers the search tool for agents, providing access to search-related data and services.',
        projectLocation: 'In the .env file on the root of the project: NEXT_PUBLIC_TRAVILY_API_KEY=your-api-key-value',
        valueLocation: 'https://tavily.com/#api'
      });
    }

    setMissingKeys(keys);
  }, []);

  return (
    <>
      {missingKeys.length > 0 && <ApiKeyError missingKeys={missingKeys} />}
    </>
  );
};

export default DevUtils;