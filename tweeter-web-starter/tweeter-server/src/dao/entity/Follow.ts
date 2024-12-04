export class Follow {
    followerHandle: string;
    followerName: string;
    followeeHandle: string;
    followeeName: string;

    constructor(
        followerHandle: string,
        followerName: string,
        followeeHandle: string,
        followeeName: string
    ) {
        this.followerHandle = followerHandle;
        this.followerName = followerName;
        this.followeeHandle = followeeHandle;
        this.followeeName = followeeName;
    }

    toString(): string {
        return (
            "Follow{" +
            "followerHandle='" +
            this.followerHandle +
            "'" +
            ", followerName='" +
            this.followerName +
            "'" +
            ", followeeHandle='" +
            this.followeeHandle +
            "'" +
            ", followeeName='" +
            this.followeeName +
            "'}"
        );
    }
}