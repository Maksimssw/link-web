import { create } from 'zustand/index'
import { Link, LinkStore } from '@/entities/link'

export const useLinkStore = create<LinkStore>((set, get) => ({
	links: [],

	setLinks: (links: Link[]) => {
		set({links})
	},

	addLink: (link: Link) => {
		set((state) => ({ links: [link, ...state.links] }));
	},

	removeLink: (id: string) => {
		set((state) => ({ links: state.links.filter((link) => link.id !== id) }));
	}
}))