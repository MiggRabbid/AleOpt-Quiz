/* eslint-disable no-unused-vars */
export enum UserRoles {
	Admin = "Admin",
	Employee = "Employee",
	Owner = "Owner",
}

export enum UserGender {
	male = "male",
	female = "female",
}

export const userGenderMap: Record<UserGender, string> = {
	male: "Муж.",
	female: "Жен.",
};

export const userRolesMap: Record<UserRoles, string> = {
	Admin: "Администратор",
	Employee: "Сотрудник",
	Owner: "Владелец",
};

export interface IUserRequest {
	role: UserRoles;
	firstName: string;
	lastname: string;
	username: string;
	password?: string | undefined;
	image: string;
	gender: UserGender;
}

export interface iUser {
	_id?: string;
	role: UserRoles;
	firstName?: string;
	lastName?: string;
	username: string;
	password?: string;
	token?: string;
	image?: string;
	gender?: UserGender;
	results?: Array<Record<string, string>>;
	lastResult?: number | null;
	numberAttempts?: number;
}

export interface iUserAnswer {
	questionId: string;
	question: string;
	userAnswerId: string;
	correctAnswerId: string;
	result: number;
}

export interface iUsersState {
	users: iUser[] | null;
	currentUser: iUser | null;
}

export interface iResultEntry {
	data: string;
	answers: iUserAnswer[];
	correctAnswers: number;
}

export interface iUsersResponse {
	status: number;
	data: iUser[] | null;
	error: iHandledError | null;
}

export interface iHandledError {
	message: string;
	errorType: string;
}

export interface iResultEntryRequest
	extends Omit<iResultEntry, "correctAnswers"> {}
