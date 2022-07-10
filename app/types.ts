export type CardItemT = {
	description?: string;
	hasActions?: boolean;
	hasVariant?: boolean;
	image?: any;
	isOnline?: boolean;
	matches?: string;
	name?: string;
};

export type IconT = {
	name: any;
	size: number;
	color: string;
	style?: any;
};

export type MessageT = {
	image: any;
	lastMessage: string;
	name: string;
};

export type ProfileItemT = {
	age?: string;
	id?: string;
	info1?: string;
	info2?: string;
	info3?: string;
	info4?: string;
	location?: string;
	matches?: string;
	name?: string;
	email?: string;
	phone?: string;
	gender?: string;
	image?: string;
};

export type TabBarIconT = {
	focused: boolean;
	iconName: any;
	text: string;
};

export type DataT = {
	id: number;
	_id: string;
	name: string;
	isOnline?: boolean;
	match?: string;
	description?: string;
	message?: string;
	image: any;
	image2?: any;
	age?: string;
	info1?: string;
	info2?: string;
	info3?: string;
	info4?: string;
	location?: string;
};

export type DataT2 = {
	id: number;
	name: string;
	isOnline?: boolean;
	match?: string;
	description?: string;
	message?: string;
	image: any;
	age?: string;
	info1?: string;
	info2?: string;
	info3?: string;
	info4?: string;
	location?: string;
};
