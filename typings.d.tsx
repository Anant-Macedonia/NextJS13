export type Leaf = {
    id: string;
    title: string;
}

export type Article = {
    hits: {
      hits: [
        {
          _source: {
            title: string;
          };
        }
      ];
    };
  };