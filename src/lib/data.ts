
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const stats = [
    { name: "Total Tasks", value: "1,204", change: "+5.2%", changeType: "positive" },
    { name: "Active Teams", value: "12", change: "+1", changeType: "positive" },
    { name: "Active Projects", value: "7", change: "-2", changeType: "negative" },
    { name: "Open Conflicts", value: "3", change: "+1", changeType: "negative" },
];

export const tasksByStatus = [
    { status: "Done", count: 45, fill: "hsl(var(--chart-1))" },
    { status: "In Progress", count: 22, fill: "hsl(var(--chart-2))" },
    { status: "To Do", count: 18, fill: "hsl(var(--muted))" },
    { status: "Blocked", count: 5, fill: "hsl(var(--destructive))" },
];

export const projectProgress = [
    { project: "Phoenix", progress: 75, goal: 100 },
    { project: "Odyssey", progress: 50, goal: 100 },
    { project: "Helios", progress: 90, goal: 100 },
    { project: "Apollo", progress: 25, goal: 100 },
    { project: "Juno", progress: 60, goal: 100 },
];

export const upcomingMeetings = [
    {
        title: "Project Phoenix Sync",
        time: "10:00 AM - 10:30 AM",
        avatars: [PlaceHolderImages[0].imageUrl, PlaceHolderImages[1].imageUrl, PlaceHolderImages[2].imageUrl],
    },
    {
        title: "Marketing Weekly Standup",
        time: "11:00 AM - 11:45 AM",
        avatars: [PlaceHolderImages[3].imageUrl, PlaceHolderImages[4].imageUrl],
    },
    {
        title: "1-on-1: Sarah & John",
        time: "2:00 PM - 2:30 PM",
        avatars: [PlaceHolderImages[0].imageUrl, PlaceHolderImages[3].imageUrl],
    },
];

export const highPriorityTasks = [
    { title: "Fix login button bug on mobile", project: "Helios", priority: "High" },
    { title: "Prepare Q3 financial report", project: "Internal", priority: "High" },
    { title: "Deploy staging server update", project: "Apollo", priority: "High" },
    { title: "Review new marketing copy", project: "Odyssey", priority: "High" },
];

export type Task = {
  id: string;
  title: string;
  brief: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  project: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Blocked';
};

export const tasks: Task[] = [
  {
    id: 'TASK-8782',
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    brief: 'Try to calculate the EXE feed, maybe it will copy the open-source capacitor!',
    assignee: { name: 'Jane Doe', avatar: PlaceHolderImages[0].imageUrl },
    dueDate: '2024-08-15',
    priority: 'Medium',
    tags: ['documentation', 'bug'],
    project: 'Phoenix',
    status: 'To Do',
  },
  {
    id: 'TASK-7878',
    title: 'Try to calculate the EXE feed, maybe it will copy the open-source capacitor!',
    brief: 'We need to bypass the neural TCP card!',
    assignee: { name: 'John Doe', avatar: PlaceHolderImages[2].imageUrl },
    dueDate: '2024-08-20',
    priority: 'High',
    tags: ['feature', 'refactor'],
    project: 'Odyssey',
    status: 'In Progress',
  },
  {
    id: 'TASK-4567',
    title: 'We need to bypass the neural TCP card!',
    brief: 'The SAS interface is down, navigate the auxiliary driver so we can back up the PNG bandwidth!',
    assignee: { name: 'Alice Smith', avatar: PlaceHolderImages[1].imageUrl },
    dueDate: '2024-08-12',
    priority: 'Low',
    tags: ['bug'],
    project: 'Helios',
    status: 'Done',
  },
    {
    id: 'TASK-2345',
    title: 'The SAS interface is down, navigate the auxiliary driver so we can back up the PNG bandwidth!',
    brief: "You can't override the interface without backing up the redundant SMTP protocol!",
    assignee: { name: 'Bob Johnson', avatar: PlaceHolderImages[3].imageUrl },
    dueDate: '2024-08-25',
    priority: 'High',
    tags: ['testing'],
    project: 'Apollo',
    status: 'Blocked',
  },
  {
    id: 'TASK-9876',
    title: "I'll compress the bluetooth JSON firewall, that should driver the SMTP application!",
    brief: "Use the cross-platform XML application, then you can generate the solid state monitor!",
    assignee: { name: 'Jane Doe', avatar: PlaceHolderImages[0].imageUrl },
    dueDate: '2024-09-01',
    priority: 'Medium',
    tags: ['documentation'],
    project: 'Phoenix',
    status: 'In Progress',
  },
    {
    id: 'TASK-5432',
    title: "Use the cross-platform XML application, then you can generate the solid state monitor!",
    brief: "I'll connect the mobile JBOD card, that should transmitter the RSS sensor!",
    assignee: { name: 'Charlie Brown', avatar: PlaceHolderImages[4].imageUrl },
    dueDate: '2024-08-18',
    priority: 'Low',
    tags: ['feature'],
    project: 'Juno',
    status: 'To Do',
  },
];


export type Project = {
  id: string;
  title: string;
  brief: string;
  role: 'Responsible' | 'Accountable' | 'Consulted' | 'Informed';
  progress: number;
  milestones: { title: string; completed: boolean }[];
  owner: { name: string; avatar: string };
  team: { name: string; avatar: string }[];
};

export const projects: Project[] = [
  {
    id: 'PROJ-001',
    title: 'Phoenix',
    brief: 'Re-engineering the core platform for scalability and performance.',
    role: 'Accountable',
    progress: 75,
    milestones: [
      { title: 'Phase 1: Discovery', completed: true },
      { title: 'Phase 2: Architecture', completed: true },
      { title: 'Phase 3: Development', completed: false },
    ],
    owner: { name: 'Jane Doe', avatar: PlaceHolderImages[0].imageUrl },
    team: [
      { name: 'John Doe', avatar: PlaceHolderImages[2].imageUrl },
      { name: 'Alice Smith', avatar: PlaceHolderImages[1].imageUrl },
      { name: 'Bob Johnson', avatar: PlaceHolderImages[3].imageUrl },
    ],
  },
  {
    id: 'PROJ-002',
    title: 'Odyssey',
    brief: 'Exploring new market opportunities with a mobile-first strategy.',
    role: 'Responsible',
    progress: 50,
    milestones: [
      { title: 'Market Research', completed: true },
      { title: 'Prototype Design', completed: false },
      { title: 'User Testing', completed: false },
    ],
    owner: { name: 'Alice Smith', avatar: PlaceHolderImages[1].imageUrl },
    team: [
      { name: 'Charlie Brown', avatar: PlaceHolderImages[4].imageUrl },
      { name: 'Jane Doe', avatar: PlaceHolderImages[0].imageUrl },
    ],
  },
  {
    id: 'PROJ-003',
    title: 'Helios',
    brief: 'Internal tool for streamlining the customer support workflow.',
    role: 'Consulted',
    progress: 90,
    milestones: [
      { title: 'Initial Specs', completed: true },
      { title: 'Beta Release', completed: true },
      { title: 'Full Rollout', completed: true },
    ],
    owner: { name: 'Bob Johnson', avatar: PlaceHolderImages[3].imageUrl },
    team: [
      { name: 'John Doe', avatar: PlaceHolderImages[2].imageUrl },
    ],
  },
];

export type Team = {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: { name: string; avatar: string, role: string }[];
}

export const teams: Team[] = [
    {
        id: "TEAM-001",
        name: "Core Platform",
        description: "Responsible for the core infrastructure and backend services.",
        progress: 80,
        members: [
            { name: "Jane Doe", avatar: PlaceHolderImages[0].imageUrl, role: "Team Lead" },
            { name: "John Doe", avatar: PlaceHolderImages[2].imageUrl, role: "Backend Engineer" },
            { name: "Bob Johnson", avatar: PlaceHolderImages[3].imageUrl, role: "DevOps Engineer" },
        ]
    },
    {
        id: "TEAM-002",
        name: "Mobile Squad",
        description: "Developing the next-generation mobile applications.",
        progress: 45,
        members: [
            { name: "Alice Smith", avatar: PlaceHolderImages[1].imageUrl, role: "Team Lead" },
            { name: "Charlie Brown", avatar: PlaceHolderImages[4].imageUrl, role: "iOS Developer" },
            { name: "Jane Doe", avatar: PlaceHolderImages[0].imageUrl, role: "Android Developer" },
        ]
    },
    {
        id: "TEAM-003",
        name: "Design System",
        description: "Maintaining and evolving the company-wide design system.",
        progress: 95,
        members: [
            { name: "John Doe", avatar: PlaceHolderImages[2].imageUrl, role: "Design Lead" },
            { name: "Alice Smith", avatar: PlaceHolderImages[1].imageUrl, role: "UI/UX Designer" },
        ]
    }
];

export type Message = {
  id: string;
  text: string;
  sender: string;
  avatar: string;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  type: 'direct' | 'group';
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: 'CONV-001',
    name: 'Alice Smith',
    avatar: PlaceHolderImages[1].imageUrl,
    lastMessage: 'Hey, did you see the latest designs?',
    type: 'direct',
    messages: [
      { id: 'MSG-001', text: 'Hey, did you see the latest designs?', sender: 'Alice Smith', avatar: PlaceHolderImages[1].imageUrl },
      { id: 'MSG-002', text: 'Yeah, they look great! Sending my feedback now.', sender: 'You', avatar: PlaceHolderImages[0].imageUrl },
      { id: 'MSG-003', text: 'Perfect, thanks!', sender: 'Alice Smith', avatar: PlaceHolderImages[1].imageUrl },
    ],
  },
  {
    id: 'CONV-002',
    name: 'Project Phoenix',
    avatar: 'https://picsum.photos/seed/302/40/40',
    lastMessage: "Let's sync up about the new API endpoints.",
    type: 'group',
    messages: [
       { id: 'MSG-004', text: "Hey team, let's sync up about the new API endpoints.", sender: 'John Doe', avatar: PlaceHolderImages[2].imageUrl },
       { id: 'MSG-005', text: "Sure, I've pushed my latest code.", sender: 'Jane Doe', avatar: PlaceHolderImages[0].imageUrl },
    ],
  },
  {
    id: 'CONV-003',
    name: 'Bob Johnson',
    avatar: PlaceHolderImages[3].imageUrl,
    lastMessage: 'Can you review my PR for the DevOps pipeline?',
    type: 'direct',
    messages: [
       { id: 'MSG-006', text: 'Can you review my PR for the DevOps pipeline?', sender: 'Bob Johnson', avatar: PlaceHolderImages[3].imageUrl },
    ],
  },
  {
    id: 'CONV-004',
    name: 'Marketing Team',
    avatar: 'https://picsum.photos/seed/304/40/40',
    lastMessage: 'The new campaign is ready for launch!',
    type: 'group',
    messages: [
        { id: 'MSG-007', text: 'The new campaign is ready for launch!', sender: 'Charlie Brown', avatar: PlaceHolderImages[4].imageUrl },
    ],
  },
];
