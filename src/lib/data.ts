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
