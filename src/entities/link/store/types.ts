export interface LinkStore {
	links: Link[];
	setLinks: (links: Link[]) => void;
	addLink: (link: Link) => void;
	removeLink: (id: string) => void;
}

export interface Link {
	id: string
	originalUrl: string
	alias: string
	expiresAt: Date | null
	userId: string
	createAt: Date
	updateAt: Date
}

export interface CreateLink {
	originalUrl: string
	alias: string
	expiresAt?: Date | undefined
}