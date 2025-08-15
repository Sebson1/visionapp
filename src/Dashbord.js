import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// --- Reusable SVG Icon Component ---
const Icon = ({ path, className = "h-6 w-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <Icon path="M6 18L18 6M6 6l12 12" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Reusable Tabs Component ---
const Tabs = ({ tabs, initialTab }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div>
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex flex-wrap space-x-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="py-6">
                {activeContent}
            </div>
        </div>
    );
};


// --- Individual Page Components ---

const DashboardPage = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['July 7', 'July 14', 'July 21', 'July 28', 'Aug 4'],
                    datasets: [{
                        label: 'Attendance',
                        data: [310, 350, 330, 380, 405],
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        borderColor: 'rgba(99, 102, 241, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } },
                    plugins: { legend: { display: false } }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    const stats = [
        { title: "Total Members", value: "482", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "blue", details: [{ label: "Male", value: "220" }, { label: "Female", value: "262" }] },
        { title: "New Converts (Month)", value: "12", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", color: "green" },
        { title: "Last Sunday's Tithe", value: "GHS 5,250", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01", color: "yellow" },
        { title: "Total Offering (Week)", value: "GHS 8,900", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", color: "indigo" },
    ];

    const birthdays = [
        { name: "Ama Adomako", date: "August 3rd", avatar: "https://placehold.co/100x100/818cf8/ffffff?text=AA" },
        { name: "Kofi Owusu", date: "August 5th", avatar: "https://placehold.co/100x100/f87171/ffffff?text=KO" },
        { name: "Esther Yeboah", date: "August 8th", avatar: "https://placehold.co/100x100/34d399/ffffff?text=EY" },
        { name: "Deacon Peter Boateng", date: "August 9th", avatar: "https://placehold.co/100x100/fbbf24/ffffff?text=PB" },
    ];

    const StatCard = ({ stat }) => (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 text-${stat.color}-600 p-3 rounded-full`}>
                    <Icon path={stat.icon} />
                </div>
            </div>
            {stat.details && (
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-around">
                    {stat.details.map(detail => (
                        <div key={detail.label} className="text-center">
                            <p className="text-sm text-slate-500">{detail.label}</p>
                            <p className="text-xl font-semibold text-slate-700">{detail.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map(stat => <StatCard key={stat.title} stat={stat} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Attendance Trend</h3>
                    <div className="h-64"><canvas ref={chartRef}></canvas></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Birthdays (Next 7 Days)</h3>
                    <ul className="space-y-4">
                        {birthdays.map(b => (
                            <li key={b.name} className="flex items-center space-x-3">
                                <img className="h-10 w-10 rounded-full" src={b.avatar} alt="avatar" />
                                <div>
                                    <p className="font-medium text-slate-700">{b.name}</p>
                                    <p className="text-sm text-slate-500">{b.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const MembersPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const members = [
        { id: 1, name: 'Ama Adomako', age: 28, gender: 'Female', contact: '0244123456', group: 'Ushering', joined: '2022-03-15' },
        { id: 2, name: 'Kofi Owusu', age: 35, gender: 'Male', contact: '0208123456', group: 'Mens Fellowship', joined: '2020-01-20' },
        { id: 3, name: 'Esther Yeboah', age: 42, gender: 'Female', contact: '0557123456', group: 'Womens Fellowship', joined: '2018-11-10' },
        { id: 4, name: 'Deacon Peter Boateng', age: 55, gender: 'Male', contact: '0277123456', group: 'Elders Council', joined: '2010-05-01' },
        { id: 5, name: 'Grace Mensah', age: 22, gender: 'Female', contact: '0501123456', group: 'Choir', joined: '2023-08-12' },
    ];

    const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Church Members</h3>
                <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                    <Icon path="M12 4v16m8-8H4" className="h-5 w-5" />
                    <span>Add New Member</span>
                </button>
            </div>
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Search for a member..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Age</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                            <th scope="col" className="px-6 py-3">Contact</th>
                            <th scope="col" className="px-6 py-3">Group</th>
                            <th scope="col" className="px-6 py-3">Date Joined</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{member.name}</td>
                                <td className="px-6 py-4">{member.age}</td>
                                <td className="px-6 py-4">{member.gender}</td>
                                <td className="px-6 py-4">{member.contact}</td>
                                <td className="px-6 py-4"><span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{member.group}</span></td>
                                <td className="px-6 py-4">{member.joined}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New Member">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
                        <input type="date" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Gender</label>
                        <select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Contact Number</label>
                        <input type="tel" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">Address</label>
                        <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Group/Department</label>
                        <select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm">
                            <option>Choir</option>
                            <option>Ushering</option>
                            <option>Mens Fellowship</option>
                            <option>Womens Fellowship</option>
                            <option>Youth</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Date Joined</label>
                        <input type="date" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                    </div>
                    <div className="md:col-span-2 text-right">
                        <button type="button" onClick={() => setModalOpen(false)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 mr-2">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Save Member</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const FinancesPage = () => {
    const financeTabs = [
        { id: 'income', label: 'Income', content: <div>Income Records</div> },
        { id: 'expenditure', label: 'Expenditure', content: <div>Expenditure Records</div> },
        { id: 'reports', label: 'Reports', content: <div>Financial Reports</div> },
    ];
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Financial Management</h3>
            <Tabs tabs={financeTabs} initialTab="income" />
        </div>
    );
};

const CommunicationsPage = () => {
    const commsTabs = [
        { id: 'send', label: 'Send SMS/Email', content: <div>Compose and send new message</div> },
        { id: 'history', label: 'History', content: <div>View sent message history</div> },
    ];
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Communications Hub</h3>
            <Tabs tabs={commsTabs} initialTab="send" />
        </div>
    );
};

const AttendancePage = () => {
    const [checkedInCount, setCheckedInCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    
    const allMembers = [
        { id: 1, name: 'Ama Adomako', group: 'Choir' }, { id: 2, name: 'Kofi Owusu', group: 'Ushers' },
        { id: 3, name: 'Esther Yeboah', group: 'Sunday School' }, { id: 4, name: 'Deacon Peter Boateng', group: "Men's Fellowship" },
        { id: 5, name: 'Grace Mensah', group: 'Choir' }, { id: 6, name: 'Samuel Tetteh', group: 'Media Team' },
        { id: 7, name: 'Linda Addo', group: "Women's Fellowship" }, { id: 8, name: 'David Quaye', group: 'Ushers' }
    ];

    const filteredMembers = allMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCheckIn = () => {
        const checked = document.querySelectorAll('#attendance-list-ul input:checked').length;
        setCheckedInCount(checked);
    };

    const RecordAttendance = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Attendance Session</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Service / Event</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>Sunday Service</option>
                                <option>Mid-week Service</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                    <p className="text-sm font-medium text-slate-500">Checked In</p>
                    <p className="text-5xl font-bold text-indigo-600 my-2">{checkedInCount} / {allMembers.length}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: `${(checkedInCount / allMembers.length) * 100}%`}}></div>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md">
                    <button className="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-semibold">
                        Save Attendance
                    </button>
                </div>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search members to check in..." className="w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"/>
                <div className="h-96 overflow-y-auto pr-2">
                    <ul id="attendance-list-ul" className="space-y-2" onChange={handleCheckIn}>
                        {filteredMembers.map(member => (
                            <li key={member.id} className="p-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                                <div>
                                    <p className="font-medium text-slate-800">{member.name}</p>
                                    <p className="text-xs text-slate-500">{member.group}</p>
                                </div>
                                <input type="checkbox" className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
    const ViewReports = () => (<div>Attendance reports table...</div>);
    const attendanceTabs = [
        { id: 'record', label: 'Take Attendance', content: <RecordAttendance /> },
        { id: 'reports', label: 'View Reports', content: <ViewReports /> },
    ];
    return <Tabs tabs={attendanceTabs} initialTab="record" />;
};

const SettingsPage = () => {
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [incomeCategories, setIncomeCategories] = useState(['Tithes', 'Offering', 'Donations', 'Seed Faith']);
    const [expenditureCategories, setExpenditureCategories] = useState(['Utilities', 'Pastoral Welfare', 'Missions & Outreach', 'Building Maintenance']);

    const CategoryManager = ({ title, categories, setCategories }) => {
        const [newCategory, setNewCategory] = useState('');
        const handleAdd = () => {
            if (newCategory.trim()) {
                setCategories(prev => [...prev, newCategory.trim()]);
                setNewCategory('');
            }
        };
        const handleDelete = (indexToDelete) => {
            setCategories(prev => prev.filter((_, index) => index !== indexToDelete));
        };
        return (
            <div>
                <h4 className="font-medium text-slate-800 mb-2">{title}</h4>
                <div className="space-y-2 mb-4">
                    {categories.map((cat, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-100 rounded">
                            <span>{cat}</span>
                            <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-lg">&times;</button>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder={`New ${title.toLowerCase()} category...`} className="flex-grow px-3 py-2 border border-slate-300 rounded-lg"/>
                    <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add</button>
                </div>
            </div>
        );
    };

    const users = [{name: 'Pastor Admin', email: 'pastor.admin@email.com', role: 'Senior Pastor'}, {name: 'John Finance', email: 'j.finance@email.com', role: 'Accountant'}];

    const settingsTabs = [
        { id: 'users', label: 'Users & Roles', content: (
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">Manage Users</h3>
                    <button onClick={() => setUserModalOpen(true)} className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 text-sm">
                        <Icon path="M12 4v16m8-8H4" className="h-5 w-5" />
                        <span>Add New User</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Role</th><th className="px-6 py-3 text-right">Actions</th></tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.email} className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4 text-right"><a href="#" className="font-medium text-indigo-600 hover:underline">Edit</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )},
        { id: 'financials', label: 'Financial Categories', content: (
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CategoryManager title="Income" categories={incomeCategories} setCategories={setIncomeCategories} />
                    <CategoryManager title="Expenditure" categories={expenditureCategories} setCategories={setExpenditureCategories} />
                </div>
            </div>
        )},
        { id: 'integrations', label: 'Integrations', content: <div>Integrations settings here.</div> },
    ];
    return (
        <>
            <Tabs tabs={settingsTabs} initialTab="users" />
            <Modal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} title="Add New User">
                 <form className="space-y-4">
                     <div>
                         <label className="block text-sm font-medium text-gray-700 required-label">Full Name</label>
                         <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                     </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 required-label">Email Address</label>
                         <input type="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"/>
                     </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 required-label">Role</label>
                         <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                             <option>Accountant</option><option>Data Entry Clerk</option><option>Department Head</option><option>Pastor</option>
                         </select>
                     </div>
                     <div className="pt-4 flex justify-end">
                         <button type="button" onClick={() => setUserModalOpen(false)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 mr-2">Cancel</button>
                         <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">Create User</button>
                     </div>
                 </form>
            </Modal>
        </>
    );
};


// --- Core Layout Components ---

const Sidebar = ({ activePage, setActivePage, isSidebarOpen, setSidebarOpen, onLogout }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
        { id: 'members', label: 'Members', icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
        { id: 'finances', label: 'Finances', icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
        { id: 'attendance', label: 'Attendance', icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { id: 'communications', label: 'Communications', icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
        { id: 'settings', label: 'Settings', icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    ];

    const handleNavClick = (pageId) => {
        setActivePage(pageId);
        if (window.innerWidth < 768) { // md breakpoint
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>
            <aside className={`w-64 bg-slate-800 text-slate-300 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
                <div className="px-4 py-6 text-center border-b border-slate-700">
                    <h1 className="text-2xl font-bold text-white">VisionLink Suite</h1>
                    <p className="text-sm text-slate-400">Christ Vision Sanctuary</p>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${activePage === item.id ? 'text-white bg-slate-900' : 'hover:bg-slate-700'}`}
                        >
                            <Icon path={item.icon} className="h-6 w-6 mr-3" />
                            {item.label}
                        </a>
                    ))}
                </nav>
                 <div className="px-2 py-4">
                    <button onClick={onLogout} className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                        <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="h-6 w-6 mr-3" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

const Header = ({ pageTitle, onMenuClick }) => (
    <header className="flex justify-between items-center p-4 bg-white border-b border-slate-200">
        <div className="flex items-center">
            <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700 focus:outline-none">
                <Icon path="M4 6h16M4 12h16M4 18h16" />
            </button>
            <h2 className="text-2xl font-semibold text-slate-800 ml-4">{pageTitle}</h2>
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-slate-600 hidden sm:block">Welcome, Pastor Admin</span>
            <img className="h-10 w-10 rounded-full object-cover" src="https://placehold.co/100x100/6366f1/ffffff?text=PA" alt="Admin Avatar" />
        </div>
    </header>
);

const MainContent = ({ activePage }) => {
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <DashboardPage />;
            case 'members': return <MembersPage />;
            case 'finances': return <FinancesPage />;
            case 'attendance': return <AttendancePage />;
            case 'communications': return <CommunicationsPage />;
            case 'settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 sm:p-6">
            {renderPage()}
        </main>
    );
};

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'Admin' && password === '123456') {
            onLogin();
        } else {
            setError('Invalid username or password.');
        }
    };
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Christ Vision Sanctuary</h1>
                    <p className="text-slate-500">VisionLink Suite</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Username</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const DashboardLayout = ({ onLogout }) => {
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const pageTitles = {
        dashboard: 'Dashboard',
        members: 'Members',
        finances: 'Finances',
        attendance: 'Attendance',
        communications: 'Communications',
        settings: 'Settings',
    };
    return (
        <div className="relative min-h-screen md:flex bg-slate-100">
            <Sidebar 
                activePage={activePage} 
                setActivePage={setActivePage}
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onLogout={onLogout}
            />
            <div className="flex-1 flex flex-col w-full">
                <Header 
                    pageTitle={pageTitles[activePage]} 
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <MainContent activePage={activePage} />
            </div>
        </div>
    );
}

// --- Main App Component ---

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <style>{`
                body { font-family: 'Inter', sans-serif; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #f1f5f9; }
                ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #64748b; }
            `}</style>
            
            {isLoggedIn ? (
                <DashboardLayout onLogout={() => setIsLoggedIn(false)} />
            ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )}
        </>
    );
}
