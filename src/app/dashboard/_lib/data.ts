import type {
	Admin,
	AgendaItem,
	CategoryItem,
	CategoryTree,
	EventItem,
	IHistoryItem,
} from "./types";

let categories: CategoryItem[] = [
	{
		id: 1,
		name: "Vie des campus",
		agendas: [],
		rootId: null,
	},
	{
		id: 2,
		name: "Activités culturelles et artistiques",
		agendas: [],
		rootId: 1,
	},
	{
		id: 3,
		name: "Ateliers",
		agendas: [],
		rootId: 1,
	},
	{
		id: 4,
		name: "Formations",
		agendas: [],
		rootId: null,
	},
	{
		id: 5,
		name: "Journées portes ouvertes",
		agendas: [],
		rootId: 4,
	},
	{
		id: 6,
		name: "Masters",
		agendas: [],
		rootId: 4,
	},
	{
		id: 7,
		name: "INFOS PRATIQUES - ACTUALITES - GRANDS RDV",
		agendas: [],
		rootId: 6,
	},
];

const admins: Admin[] = [
	{
		id: 1,
		name: "Jean Michel Da Silva Da Costa",
		email: "jmd@example.com",
		avatar:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXia5ZUF0lUUa3JrMJzVQ2r-ojR8D6E9tZnd6D-6teRQ&s",
	},
	{
		id: 2,
		name: "Jean-Michel Da Silva Da Costa",
		email: "jmd@example.com",
		avatar:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXia5ZUF0lUUa3JrMJzVQ2r-ojR8D6E9tZnd6D-6teRQ&s",
	},
];

const history: IHistoryItem[] = [
	{
		type: "event",
		id: 1,
		adminId: 1,
		action: "Créer",
		date: "2023-05-22T09:00:00Z",
	},
	{
		type: "event",
		id: 2,
		adminId: 1,
		action: "Modifier logo",
		date: "2023-05-22T09:00:00Z",
	},
	{
		type: "event",
		id: 3,
		adminId: 2,
		action: "Modifier description",
		date: "2023-05-22T09:00:00Z",
	},
	{
		type: "event",
		id: 4,
		adminId: 2,
		action: "Supprimer",
		date: "2023-05-22T09:00:00Z",
	},
	{
		type: "event",
		id: 5,
		adminId: 1,
		action: "Publier",
		date: "2023-05-22T09:00:00Z",
	},
].map((history) => ({
	...history,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	admin: admins.find((admin) => admin.id === history.adminId)!,
}));

const events: EventItem[] = [
	{
		agendaId: "a1",
		id: 4,
		name: "Les transformations contemporaines des mouvements féministes",
		description:
			"Un colloque organisé par l'Institut de Recherche Interdisciplinaire en Sciences Sociales (IRISSO) de l'Université Paris Dauphine - PSL.",
		cover:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdsPS1Wszn4-WjQ5fGf2NYjug73A--0mfshttUdPSFA&s",
		isDraft: false,
		location: null,
		url: "https://aisummit2024.com",
		startDate: "2024-05-22T09:00:00Z",
		endDate: "2024-05-23T17:00:00Z",
		categories: ["Colloque"],
		likes: 100,
		subscribers: 250,
		history,
	},
	{
		agendaId: "a1",
		id: 5,
		name: "Rencontre Act4Talents : Enjeux et Futur du Learning",
		description:
			"Explorez des retours d'expérimentation et des regards croisés de chercheurs, dirigeants, DRH, experts...",
		cover:
			"https://miro.medium.com/v2/resize:fit:5000/1*EpAouv0mqGC282ZP32W7ew.png",
		isDraft: false,
		location: null,
		url: "https://cybersec2024.com",
		startDate: "2024-05-27T09:00:00Z",
		endDate: "2024-05-27T17:00:00Z",
		categories: ["Networking"],
		likes: 90,
		subscribers: 220,
		history,
	},
	{
		agendaId: "a2",
		id: 6,
		name: "Soirée Cigare",
		description:
			"Le Club Cigare de Dauphine Alumni vous propose une soirée exceptionnelle : Mercredi 22 mai 2024 à 19h00 à l'Université Paris Daup...",
		cover:
			"https://c8.alamy.com/comp/2D6N4J7/cuban-cigars-and-accessories-vector-vintage-sketch-illustration-tobacco-smoking-hand-drawn-icons-set-isolated-on-white-background-2D6N4J7.jpg",
		isDraft: false,
		location: "Place du Maréchal de Lattre de Tassigny",
		url: "https://filmfestival2024.com",
		startDate: "2024-05-22T19:00:00Z",
		endDate: "2024-05-22T22:00:00Z",
		categories: [],
		likes: 120,
		subscribers: 320,
		history,
	},
	{
		agendaId: "a2",
		id: 7,
		name: "Valoriser les atouts de son expérience senior",
		description:
			"Dauphine Alumni en partenariat avec l'APEC vous bropose un atelier sur le thème : Valoriser les atouts de son expérience senior.",
		cover:
			"https://media.istockphoto.com/id/2117131248/vector/learning-new-skills-concept.jpg?s=612x612&w=0&k=20&c=9w_DObpuj73BLbBobjul_i0CmPk22WZoq-jIwe84n1Q=",
		isDraft: false,
		location: "Place du Maréchal de Lattre de Tassigny",
		url: "https://filmfestival2024.com",
		startDate: "2024-05-22T12:30:00Z",
		endDate: "2024-05-22T15:00:00Z",
		categories: ["Conférence"],
		likes: 120,
		subscribers: 320,
		history,
	},
	{
		agendaId: "a2",
		id: 8,
		name: "Atelier CV et lettre de motivation",
		description:
			"Le Pôle Mobilité Carrière de Dauphine Alumni vous invite à un atelier sur la rédaction du CV et de la lettre de motivation. Mercredi 6 mars à 1...",
		cover:
			"https://unblast.com/wp-content/uploads/2020/05/Writing-CV-Illustration.jpg",
		isDraft: false,
		location: null,
		url: "https://filmfestival2024.com",
		startDate: "2024-03-06T12:15:00Z",
		endDate: "2024-03-06T15:00:00Z",
		categories: ["Atelier"],
		likes: 120,
		subscribers: 320,
		history,
	},
	{
		agendaId: "a2",
		id: 8,
		name: "Innover en management avec la Casa de Papel",
		description: `Dans le cadre du cycle 2023/24 des séminaires "Innover en Management " du Cercle de l'innovation`,
		cover:
			"https://media.revistagq.com/photos/5d2721db987c410008630f2f/16:9/w_1920,h_1080,c_limit/la%20casa%20de%20papel.jpg",
		isDraft: false,
		location: "Place du Maréchal de Lattre de Tassigny",
		url: "https://filmfestival2024.com",
		startDate: "2024-02-07T08:30:00Z",
		endDate: "2024-02-07T12:00:00Z",
		categories: ["Business"],
		likes: 120,
		subscribers: 320,
		history,
	},
	{
		agendaId: "a2",
		id: 10,
		name: "Study smart, not hard",
		description: null,
		cover: null,
		isDraft: true,
		location: null,
		url: null,
		startDate: null,
		endDate: null,
		categories: [],
		likes: null,
		subscribers: null,
		history,
	},
];

const getAgendaEvents = (agendaId: string) =>
	events
		.filter((event) => event.agendaId === agendaId)
		.sort((a, b) =>
			b.startDate && a.startDate
				? new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
				: 0,
		);

const getCategoryById = (id: number) => categories.find((c) => c.id === id);

const agendas: AgendaItem[] = [
	{
		id: "a1",
		name: "Dauphine - PSL",
		description:
			"Son offre de formation toujours plus attractive, la renommée internationale de ses équipes scientifiques, et la reconnaissance de son modèle de développement obtenue avec l'accréditation Equis font de Dauphine une université créative, responsable et résolument tournée vers l'international.",
		cover:
			"https://cdn.britannica.com/78/149478-050-6C499F38/Palace-of-the-Parliament-Dauphine-region-Grenoble.jpg",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXia5ZUF0lUUa3JrMJzVQ2r-ojR8D6E9tZnd6D-6teRQ&s",
		eventsNumber: 10,
		attendanceRate: 75.5,
		events: getAgendaEvents("a1"),
		history,
		admins,
		categories: [1].map(getCategoryById) as CategoryItem[],
	},
	{
		id: "a2",
		name: "Dauphine Alumni",
		description:
			"Dauphine Alumni est l'association des diplômés et des étudiants de l'Université Dauphine-PSL.",
		cover:
			"https://www.lalettredelassurance.com/wp-content/uploads/2014/03/Logo-Dauphine-Alumni-.jpg",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoBSZdmbvoM6_U90DNZ9Kbcv43bL6d8skLJPdcDH1Zg&s",
		eventsNumber: 5,
		attendanceRate: 60.3,
		events: getAgendaEvents("a2"),
		history,
		admins,
		categories: [2].map(getCategoryById) as CategoryItem[],
	},
	{
		id: "a3",
		name: "Événements Sportifs 2024",
		description: "Les événements sportifs à ne pas manquer en 2024.",
		cover: null,
		logo: null,
		eventsNumber: null,
		attendanceRate: null,
		isDraft: true,
		events: getAgendaEvents("a3"),
		history,
		admins,
		categories: [2].map(getCategoryById) as CategoryItem[],
	},
];

categories = categories
	.map((category) => {
		const relatedAgendas = agendas.filter((agenda) =>
			agenda.categories.includes(category),
		);
		category.agendas = relatedAgendas;
		return category;
	})
	.map((category) => {
		const root = categories.find((c) => c.id === category.rootId);
		if (root) {
			root.root = category;
		}
		return category;
	});

// build a tree from the categories:
const tree = categories.reduce((acc, category) => {
	const parent = acc.find((c) => c.id === category.rootId);
	if (parent) {
		if (!parent.children) {
			parent.children = [];
		}
		parent.children?.push(category);
	} else {
		acc.push(category);
	}
	return acc;
}, [] as CategoryTree[]);

export const getAgenda = (id: string) => {
	const agenda = agendas.find((item) => item.id === id);
	if (!agenda) {
		return null;
	}
	return agenda;
};

export const getAllAgendas = () => agendas;

export const getEvent = (eventId: number) => {
	const event = events.find((item) => item.id === eventId);
	if (!event) {
		return null;
	}
	const agenda = agendas.find((item) => item.id === event.agendaId);
	if (!agenda) {
		return null;
	}
	return {
		...event,
		agenda,
	};
};

export const getHistory = () => history;

export const getAllCategories = () => categories;

export const getAllCategoriesTree = () => tree;

export const getAllAdmins = () => admins;
