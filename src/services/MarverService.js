import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=81aaa4d4c4dced932adda9ef92645c04";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };
  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };
  const getSingleCharacter = async (nameChar) => {
    const res = await request(
      `${_apiBase}characters?name=${nameChar}&${_apiKey}`
    );

    return _transformCharacter(res.data.results[0]);
  };
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      descr: char.description
        ? char.description
        : "This character has no description",
      thumnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      price: comics.prices[0].price,
      thumnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      description: comics.description || "There is no description",
      language: comics.textObjects.language || "en-us",
    };
  };
  return {
    getCharacter,
    getAllCharacters,
    loading,
    error,
    clearError,
    getAllComics,
    getComics,
    getSingleCharacter,
  };
};
export default useMarvelService;
