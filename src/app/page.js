"use client"
import { blogTeam } from './blogTeam';
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import DevUtils from './DevUtils';

export default function Home() {
  // Setting up State
  const [topic, setTopic] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [stats, setStats] = useState(null);

  // Connecting to the KaibanJS Store
  const useTeamStore = blogTeam.useStore();

  const {
    agents,
    tasks,
    teamWorkflowStatus
  } = useTeamStore(state => ({
    agents: state.agents,
    tasks: state.tasks,
    teamWorkflowStatus: state.teamWorkflowStatus
  }));

  const generateBlogPost = async () => {
    setBlogPost('');
    setStats(null);

    try {
      const output = await blogTeam.start({ topic });
      if (output.status === 'FINISHED') {
        setBlogPost(output.result);

        const { costDetails, llmUsageStats, duration } = output.stats;
        setStats({
          duration: duration,
          totalTokenCount: llmUsageStats.inputTokens + llmUsageStats.outputTokens,
          totalCost: costDetails.totalCost
        });
      } else if (output.status === 'BLOCKED') {
        console.log(`Workflow is blocked, unable to complete`);
      }
    } catch (error) {
      console.error('Error generating blog post:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">AI Agents News Blogging Team</h1>
      <div className="grid">
        <div className="column">
          <div className="options">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic... E.g. 'AI News Sep, 2024'"
            />
            <button onClick={generateBlogPost}>
              Generate
            </button>
          </div>
          <div className="status">Status <span>{teamWorkflowStatus}</span></div>
          {/* Generated Blog Post */}
          <div className="blog-post">
            {blogPost ? (
              <ReactMarkdown>{blogPost}</ReactMarkdown>
            ) : (
              <p className="blog-post-info"><span>ℹ️</span><span>No blog post available yet</span><span>Enter a topic and click 'Generate' to see results here.</span></p>
            )}
          </div>
        </div>

        {/* We'll add more UI elements in the next steps */}
        <div className="column">
          {/* Agents Here */}
          <h2 className="title">Agents</h2>
          <ul className="agent-list">
            {agents && agents.map((agent, index) => (
              <li key={index}>
                <img src={`https://ui-avatars.com/api/name=${encodeURIComponent(agent.name)}?background=3b82f6&color=fff`} alt={`${agent.name}'s avatar`} />
                <span>{agent.name}</span>
                <span>{agent.status}</span>
              </li>
            ))}
          </ul>

          {/* Tasks Here */}
          <h2 className="title">Tasks</h2>
          <ul className="task-list">
            {tasks && tasks.map((task, index) => (
              <li key={index}>
                <span>{task.description}</span>
                <span>{task.status}</span>
              </li>
            ))}
          </ul>

          {/* Stats Here */}
          <h2 className="title">Stats</h2>
          {stats ? (
            <div className="stats">
              <p>
                <span>Total Tokens: </span>
                <span>{stats.totalTokenCount}</span>
              </p>
              <p>
                <span>Total Cost: </span>
                <span>${stats.totalCost.toFixed(4)}</span>
              </p>
              <p>
                <span>Duration: </span>
                <span>{stats.duration} ms</span>
              </p>
            </div>
          ) : (
            <div className="stats"><p className="stats-info">ℹ️ No stats generated yet.</p></div>
          )}
        </div>
      </div>
      <DevUtils />
    </div>
  );
}
