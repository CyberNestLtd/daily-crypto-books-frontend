import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";

export function Profile() {
  const [profile, setProfile] = useState(null);
  let baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, user might not be logged in.");
          return;
        }

        const response = await axios.get(`${baseUrl}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);
  
  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              {/* <Avatar
                src={profile.avatar || "/img/default-avatar.png"}
                alt={profile.name}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              /> */}
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profile.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {profile.role}
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          <ProfileInfoCard
            title="Profile Information"
            description={profile.bio || "No bio available"}
            details={{
              "Full Name": profile.name,
              Mobile: profile.phone || "N/A",
              Email: profile.email,
              Location: profile.location || "N/A",
            }}
            action={
              <Tooltip content="Edit Profile">
                <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
              </Tooltip>
            }
          />
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
