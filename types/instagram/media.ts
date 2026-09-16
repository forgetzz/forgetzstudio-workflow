

export type InstagramContainer = {
    userId: string;
    containerId: string;
    instagramUserId: string;
    status: boolean | null;
    publish: boolean | null;
    scheduledAt: string | null;
    createAt: string | null;
    updateAt: string | null;
};

export type ContainerResponse = {
    success: boolean;
    data?: {
        containerId: string;
        instagramUserId: string;
    };
};