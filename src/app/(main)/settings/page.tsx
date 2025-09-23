
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences here.</p>
        </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This is how others will see you on the site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Jane Doe" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input id="avatar" defaultValue="https://picsum.photos/seed/101/40/40" />
                </div>
                <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label>Plan</Label>
                    <p className='text-sm'>You are currently on the <strong>Pro</strong> plan.</p>
                    <Button variant="outline">Change Plan</Button>
                </div>
                <div>
                    <Button variant="destructive">Delete Account</Button>
                    <p className='text-xs text-muted-foreground mt-2'>This action is irreversible.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm">Theme (Coming soon)</p>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="email-notifications" defaultChecked/>
                    <Label htmlFor="email-notifications">Email notifications</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="push-notifications"/>
                    <Label htmlFor="push-notifications">Push notifications</Label>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Connect with your favorite tools.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Integrations settings will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="data" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Manage your data retention and export options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline">Export My Data</Button>
                     <p className="text-sm text-muted-foreground">Data retention policy settings will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
