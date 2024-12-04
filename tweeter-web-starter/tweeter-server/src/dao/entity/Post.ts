export class Post {
    userAlias: string;
    timeCreated: string;
    post: string;
    belongAlias: string;

    constructor(
        userAlias: string,
        timeCreated: string,
        post: string,
        belongAlias: string
    ) {
        this.userAlias = userAlias;
        this.timeCreated = timeCreated;
        this.post = post;
        this.belongAlias = belongAlias;
    }

    //   toString(): string {
    //     return (
    //       "Follow{" +
    //       "followerHandle='" +
    //       this.followerHandle +
    //       "'" +
    //       ", followerName='" +
    //       this.followerName +
    //       "'" +
    //       ", followeeHandle='" +
    //       this.followeeHandle +
    //       "'" +
    //       ", followeeName='" +
    //       this.followeeName +
    //       "'}"
    //     );
    //   }
}