import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';

const GithubStats = () => {
  const { theme } = useTheme();
  const [totalCount, setTotalCount] = useState(0); // Holds true calculated live count

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/xtroon')
      .then((res) => res.json())
      .then((data) => {
        if (data?.contributions) {
          // Calculate exact real-time total contributions in the last year
          const sum = data.contributions.reduce((acc, curr) => acc + curr.count, 0);
          setTotalCount(sum);
        }
      })
      .catch((err) => {
        console.error('Error fetching dynamic git count:', err);
      });
  }, []);

  const customTheme = {
    dark: ['#161b22', '#2a3b5c', '#3d5a96', '#5079d0', '#6399ff'],
    light: ['#ebedf0', '#c6dbef', '#9ecae1', '#6baed6', '#2171b5']
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-primary)]/50">
      <div className="max-w-6xl mx-auto git-container">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-[var(--border-primary)]/50 pb-6 select-none">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2 block">
              DEVELOPER ACTIVITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              GitHub Contributions
            </h2>
          </div>
          <div className="text-left sm:text-right">

            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              <span className="text-xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {totalCount > 0 ? totalCount.toLocaleString() : '...'}
              </span>
              <br />Contributions in the last year
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-4 scrollbar-none flex justify-start sm:justify-center">
          <div className="min-w-[850px] py-4 px-2 select-none custom-git-calendar">
            <GitHubCalendar 
              username="xtroon" 
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              theme={customTheme}
              blockSize={14}
              blockMargin={4}
              showWeekdayLabels={true}
              hideTotalCount={true} 
              labels={{
                totalCount: '',
              }}
            />
          </div>
        </div>

      </div>

      <style>{`
        .custom-git-calendar .react-activity-calendar {
          font-family: inherit !important;
          color: var(--text-secondary) !important;
        }
        /* Style month and weekday labels */
        .custom-git-calendar .react-activity-calendar select,
        .custom-git-calendar .react-activity-calendar text {
          fill: var(--text-secondary) !important;
          font-size: 10px !important;
          font-weight: 600 !important;
        }
        .custom-git-calendar .react-activity-calendar__footer {
          margin-top: 14px !important;
          display: flex !important;
          justify-content: flex-end !important;
        }
        /* Hide the redundant count text in the footer specifically */
        .custom-git-calendar .react-activity-calendar__count {
          display: none !important;
        }
        /* Align color legend on the right and style Less/More labels */
        .custom-git-calendar .react-activity-calendar__legend-colors {
          margin-left: auto !important;
          margin-right: 0 !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: var(--text-secondary) !important;
        }
      `}</style>
    </section>
  );
};

export default GithubStats;
