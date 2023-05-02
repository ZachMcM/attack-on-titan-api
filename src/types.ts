export type Relative = {
  family: string;
  members: string[];
};

export type Group = {
  name: string;
  sub_groups: string[];
};

export type Character = {
  id: number;
  name: string;
  img: string;
  alias: string[];
  species: string[];
  gender: string;
  age: number;
  height: string;
  relatives: Relative[];
  birthplace: string;
  residence: string;
  status: string;
  occupation: string;
  groups: Group[];
  roles: string[];
  episodes: string[];
};

export type Episode = {
  id: number;
  name: string;
  img: string;
  episode: string;
  characters: string[];
};

export type Location = {
  id: number;
  name: string;
  img: string;
  territory: string;
  region: string;
  status: string;
  notable_inhabitants: string[];
  notable_former_inhabitants: string[];
  debut: string;
};

export type Organization = {
  id: number;
  name: string;
  img: string;
  occupations: string[];
  notable_members: string[];
  notable_former_members: string[];
  affiliation: string;
  debut: string;
};

export type Titan = {
  id: number;
  name: string;
  img: string;
  height: string;
  abilities: string[];
  current_inheritor: string;
  former_inheritors: string[];
  allegiance: string[];
};

export type DataResponse = {
  info: {
    count: number;
    pages: number;
    next_page: null | string;
    prev_page: null | string;
  };
  results: Character[] | Episode[] | Location[] | Organization[] | Titan[];
};
