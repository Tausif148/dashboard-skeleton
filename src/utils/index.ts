// import dayjs from "dayjs";
// import { IDiscussionRoomData } from "src/interface/discutionRoom.types";
// import { IPost } from "src/interface/posts.types";

// export const calculateAge = (dob: string): string => {
//     if (!dob) return '';
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age.toString();
// };

// export function mapApiPostToFormValues(post: IPost): any {
//     return {
//         id: post.id,
//         title: post.title || '',
//         content: post.content || '',
//         status: post.status || 'Draft',
//         stickyPost: post.stickyPost || false,
//         disableComments: post.disableComments || false,
//         postDateTime: post.postDateTime ? dayjs(post.postDateTime) : null,
//         discussionRoomCategoryId: post.discussionRoomCategory?.id || '',
//         postedById: post.postedBy?.id || '',
//         tags: Array.isArray(post.tags) ? post.tags : post.tags?.split(",") || [],
//         images: post.PostImage?.map((img: any) => img.url) || []
//     };
// }

// export const mapDiscussionRoomData = (apiData: any): IDiscussionRoomData => {
//     return {
//         id: apiData.id || '',
//         name: apiData.name || '',
//         description: apiData.description || '',
//         headerImage: apiData.headerImage || '',
//         iconImage: apiData.iconImage || '',
//         subscriptionId: apiData.Subscription?.id || '',
//         createdAt: apiData.createdAt || '',
//         active: apiData.status === 'ACTIVE',
//         roleOnCategories: apiData.roleOnCategories || [],
//         userOnCategories: apiData.userOnCategories || [],
//         roleIds: apiData.roleOnCategories?.map((r: any) => r.role?.id).filter(Boolean) || [],
//         userIds: apiData.userOnCategories?.map((u: any) => u.user?.id).filter(Boolean) || [],
//     };
// };

// export function capitalizeWord(word: string) {
//     if (!word) return "";
//     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// }


// export function hexToRgb(hex = "#000000") {
//     try {
//         const clean = hex.replace("#", "").trim();
//         if (clean.length !== 6) return "0,0,0";
//         const r = parseInt(clean.substring(0, 2), 16);
//         const g = parseInt(clean.substring(2, 4), 16);
//         const b = parseInt(clean.substring(4, 6), 16);
//         return `${r}, ${g}, ${b}`;
//     } catch {
//         return "0,0,0";
//     }
// }