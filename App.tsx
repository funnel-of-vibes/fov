import React, {useState} from 'react';
import {AppEntry, AppStage} from './types';
import AddAppModal from './components/AddAppModal';
import Button from './components/CyberButton';

const HARDCODED_APPS: AppEntry[] = [
    // Vibe Stage
    {
        id: '1',
        name: 'Homo Agenticus',
        link: 'http://homo.agenticus.eu',
        author: 'The_Architect',
        likes: 0,
        vibeScore: 99,
        description: 'Autonomous agentic humans who make informed decisions',
        timestamp: Date.now() - 10000000,
        stage: 'vibe'
    },
    {
        id: '8',
        name: 'Vibes 4 Humanity',
        link: 'http://vibes4humanity.agenticus.eu',
        author: 'The_Master_Viber',
        likes: 0,
        vibeScore: 99,
        contributors: 1,
        description: 'Choose your future job',
        timestamp: Date.now() - 10000000,
        stage: 'vibe'
    },
    {
        id: '2',
        name: 'Sapiens Goal Tracker',
        link: 'http://sapiensgoaltracker.agenticus.eu',
        author: 'Chronos_Surfer',
        likes: 0,
        vibeScore: 95,
        description: 'Goal tracker app to support realistic evolution of navigating through life',
        timestamp: Date.now() - 5000000,
        stage: 'vibe'
    },
    {
        id: '3',
        name: 'AI before humans',
        link: '#',
        author: 'Closed_Mind',
        likes: 0,
        vibeScore: 88,
        description: 'AIs and AI masters must rule the world.',
        timestamp: Date.now() - 2000000,
        stage: 'vibe'
    },
    // Building Stage
    {
        id: '9',
        name: 'Funnel of Vibes',
        link: 'https://agenticus.eu',
        author: 'Community',
        likes: 1,
        userCount: 1,
        contributors: 1,
        vibeScore: 100,
        description: 'Building the future of software together',
        timestamp: Date.now() - 10000000,
        stage: 'building'
    },
    // Scaling Stage
    {
        id: '6',
        name: 'Global Mesh',
        link: '#',
        author: 'Net_Runner',
        likes: 5600,
        userCount: 45000,
        vibeScore: 91,
        description: 'Planetary scale distinct decentralized internet.',
        timestamp: Date.now() - 12000000,
        stage: 'scaling'
    },
    {
        id: '7',
        name: 'Data Ocean',
        link: '#',
        author: 'Deep_Dive',
        likes: 3400,
        userCount: 12000,
        vibeScore: 85,
        description: 'Infinite storage for the collective consciousness.',
        timestamp: Date.now() - 9000000,
        stage: 'scaling'
    }
];

const FunnelVisualization: React.FC<{ currentStage: AppStage }> = ({currentStage}) => {
    return (
        <>
            {/* Desktop Version */}
            <div className="w-full max-w-3xl mx-auto mb-8 hidden sm:block">
                <svg viewBox="0 0 800 160" className="w-full h-auto drop-shadow-sm">
                    {/* VIBE STAGE */}
                    <g transform="translate(0,0)" className="transition-opacity duration-300"
                       style={{opacity: currentStage === 'vibe' ? 1 : 0.5}}>
                        {/* Funnel Part 1: Wide to narrower */}
                        <path d="M10 10 L260 30 L260 130 L10 150 Z" className="fill-pink-50 stroke-pink-200"
                              strokeWidth="2"/>
                        <text x="135" y="115" textAnchor="middle"
                              className="fill-pink-800 text-sm font-bold uppercase tracking-wider"
                              style={{fontSize: '14px'}}>Vibe Checking
                        </text>
                        <g transform="translate(119, 50) scale(1.5)">
                            <path stroke="currentColor" className="text-pink-500" strokeLinecap="round"
                                  strokeLinejoin="round" strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </g>
                    </g>

                    {/* Connector 1 */}
                    <line x1="265" y1="80" x2="285" y2="80" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4"/>

                    {/* BUILDING STAGE - Blue Wrench Theme */}
                    <g transform="translate(290,0)" className="transition-opacity duration-300"
                       style={{opacity: currentStage === 'building' ? 1 : 0.5}}>
                        {/* Funnel Part 2: Narrower to more narrow */}
                        <path d="M0 30 L250 50 L250 110 L0 130 Z" className="fill-blue-50 stroke-blue-200"
                              strokeWidth="2"/>
                        <text x="125" y="100" textAnchor="middle"
                              className="fill-blue-800 text-sm font-bold uppercase tracking-wider"
                              style={{fontSize: '14px'}}>Building
                        </text>
                        <g transform="translate(109, 45) scale(1.5)">
                            {/* Spanner Wrench Icon */}
                            <path stroke="currentColor" className="text-blue-600" fill="currentColor" fillOpacity="0.1"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                        </g>
                    </g>

                    {/* Connector 2 */}
                    <line x1="545" y1="80" x2="565" y2="80" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4"/>

                    {/* SCALING STAGE */}
                    <g transform="translate(570,0)" className="transition-opacity duration-300"
                       style={{opacity: currentStage === 'scaling' ? 1 : 0.5}}>
                        {/* Funnel Part 3: Pipe/Tube */}
                        <path d="M0 50 L220 60 L220 100 L0 110 Z" className="fill-green-50 stroke-green-200"
                              strokeWidth="2"/>
                        <text x="110" y="90" textAnchor="middle"
                              className="fill-green-800 text-sm font-bold uppercase tracking-wider"
                              style={{fontSize: '14px'}}>Scaling
                        </text>
                        <g transform="translate(94, 40) scale(1.5)">
                            <path stroke="currentColor" className="text-green-500" strokeLinecap="round"
                                  strokeLinejoin="round" strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </g>
                    </g>
                </svg>
            </div>

            {/* Mobile Simplified Version - Top Right Absolute */}
            <div className="absolute top-0 right-0 sm:hidden opacity-90 p-1">
                <svg width="80" height="40" viewBox="0 0 120 60" className="drop-shadow-sm">
                    {/* Vibe */}
                    <path d="M2 5 L40 12 L40 48 L2 55 Z"
                          className={`stroke-pink-200 transition-colors duration-300 ${currentStage === 'vibe' ? 'fill-pink-100 stroke-pink-400' : 'fill-white'}`}
                          strokeWidth="2"
                          style={{opacity: currentStage === 'vibe' ? 1 : 0.5}}
                    />
                    {/* Building - Blue */}
                    <path d="M44 12 L78 18 L78 42 L44 48 Z"
                          className={`stroke-blue-200 transition-colors duration-300 ${currentStage === 'building' ? 'fill-blue-100 stroke-blue-400' : 'fill-white'}`}
                          strokeWidth="2"
                          style={{opacity: currentStage === 'building' ? 1 : 0.5}}
                    />
                    {/* Scaling */}
                    <path d="M82 18 L118 18 L118 42 L82 42 Z"
                          className={`stroke-green-200 transition-colors duration-300 ${currentStage === 'scaling' ? 'fill-green-100 stroke-green-400' : 'fill-white'}`}
                          strokeWidth="2"
                          style={{opacity: currentStage === 'scaling' ? 1 : 0.5}}
                    />
                </svg>
            </div>
        </>
    );
};

const App: React.FC = () => {
    const [apps, setApps] = useState<AppEntry[]>(HARDCODED_APPS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<AppStage>('vibe');

    const filteredApps = apps.filter(app => app.stage === activeTab);

    // Helper to get metric value based on stage
    const getAppMetric = (app: AppEntry, stage: AppStage): number => {
        switch (stage) {
            case 'building':
                return app.contributors || 0;
            case 'scaling':
                return app.userCount || 0;
            case 'vibe':
            default:
                return app.likes;
        }
    };

    // Sort by the specific metric for the current stage
    const sortedApps = [...filteredApps].sort((a, b) => {
        const scoreA = getAppMetric(a, activeTab);
        const scoreB = getAppMetric(b, activeTab);
        return scoreB - scoreA;
    });

    const handleAddApp = (newApp: AppEntry) => {
        setApps([{...newApp, stage: 'vibe'}, ...apps]);
        setActiveTab('vibe');
    };

    const toggleLike = (id: string) => {
        setApps(apps.map(app => {
            if (app.id === id) {
                if (activeTab === 'building') {
                    return {...app, contributors: (app.contributors || 0) + 1};
                } else if (activeTab === 'scaling') {
                    return {...app, userCount: (app.userCount || 0) + 1};
                } else {
                    return {...app, likes: app.likes + 1};
                }
            }
            return app;
        }));
    };

    const tabs: { id: AppStage; label: string }[] = [
        {id: 'vibe', label: 'Vibes'},
        {id: 'building', label: 'Building'},
        {id: 'scaling', label: 'Scaling'},
    ];

    const stageSkills: Record<AppStage, string> = {
        vibe: "English",
        building: "Frontend, Backend, DB",
        scaling: "Old School Software Development, but a lost faster and cheaper"
    };

    // Icon config
    const getStageIcon = (stage: AppStage) => {
        switch (stage) {
            case 'building':
                // Wrench Icon (Spanner)
                return (
                    <svg className="w-4 h-4" fill="currentColor" fillOpacity="0.2" stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                );
            case 'scaling':
                // User (Stick figure-ish)
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                );
            case 'vibe':
            default:
                // Heart
                return (
                    <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-6 max-w-5xl">

                {/* Header & Nav */}
                <header className="mb-6 relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div
                            className="pr-20 sm:pr-0"> {/* Add padding right on mobile to avoid overlap with funnel icon */}
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Funnel of Vibes
                            </h1>
                            <p className="text-sm text-gray-500">
                                Vibers Community
                            </p>
                        </div>
                        <div>
                            <Button onClick={() => setIsModalOpen(true)} variant="primary" className="text-sm">
                                + Submit Vibe Code
                            </Button>
                        </div>
                    </div>

                    {/* Funnel Visualization */}
                    <FunnelVisualization currentStage={activeTab}/>

                    {/* Top Menu Tabs */}
                    <nav className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-4 w-full md:w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full md:w-auto rounded-lg px-4 py-2 text-sm font-medium leading-5 transition-all
                  ${activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow'
                                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* Skills Section */}
                    <div
                        className="mb-6 bg-white border border-gray-200 rounded-lg p-3 shadow-sm inline-flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skills:</span>
                        <span className="text-sm font-medium text-gray-800">{stageSkills[activeTab]}</span>
                    </div>
                </header>

                {/* List - Compact Design */}
                <div className="space-y-3">
                    {sortedApps.length === 0 ? (
                        <div
                            className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                            No apps in this stage yet.
                        </div>
                    ) : (
                        sortedApps.map((app, index) => {
                            const metricValue = getAppMetric(app, activeTab);
                            return (
                                <div
                                    key={app.id}
                                    className="group bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">

                                        {/* Left Section: Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    className="text-gray-400 font-mono text-xs w-5 flex-shrink-0">#{index + 1}</span>
                                                <h3 className="text-base font-bold text-gray-900 truncate">
                                                    <a href={app.link} target="_blank" rel="noopener noreferrer"
                                                       className="hover:text-blue-600 transition-colors">
                                                        {app.name}
                                                    </a>
                                                </h3>
                                                {/* Vibe Badge */}
                                                <span
                                                    className={`px-1.5 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wide flex-shrink-0 ${
                                                        app.vibeScore >= 90 ? 'bg-green-100 text-green-800' :
                                                            app.vibeScore >= 70 ? 'bg-blue-100 text-blue-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                            {app.vibeScore} Vibe
                          </span>
                                            </div>

                                            <p className="text-xs text-gray-600 truncate mb-1.5">
                                                {app.description}
                                            </p>

                                            <div className="flex items-center gap-3 text-[10px] text-gray-400">
                                                <span className="font-medium text-gray-600">{app.author}</span>
                                                <span>•</span>
                                                <span>{new Date(app.timestamp).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Right Section: Actions */}
                                        <div className="flex items-center gap-3 mt-2 sm:mt-0 pl-7 sm:pl-0">
                                            <button
                                                onClick={() => toggleLike(app.id)}
                                                className={`flex items-center gap-1.5 group/btn px-2 py-1 rounded hover:bg-gray-50 transition-colors ${
                                                    activeTab === 'vibe' && metricValue > 0 ? 'text-red-500' :
                                                        activeTab === 'building' ? 'text-blue-600' :
                                                            activeTab === 'scaling' ? 'text-green-600' : 'text-gray-400'
                                                }`}
                                            >
                                                {getStageIcon(activeTab)}
                                                <span
                                                    className="text-xs font-semibold text-gray-700 min-w-[2rem] text-right">
                               {metricValue.toLocaleString()}
                             </span>
                                            </button>

                                            <a
                                                href={app.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-all"
                                            >
                                                Visit
                                            </a>
                                            <a
                                                href="https://github.com/funnel-of-vibes/fov"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-all"
                                                aria-label={`View source code for ${app.name}`}
                                            >
                                                Source
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-400 text-xs">
                    <p>© {new Date().getFullYear()} Vibe Coded Community</p>
                </footer>

            </div>

            <AddAppModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddApp}
            />
        </div>
    );
};

export default App;