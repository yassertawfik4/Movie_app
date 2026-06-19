import { axiosMovieInstance } from "./axiosInstance"

const handleRequest =async(request)=>{
    try{
        const response=await request
        return response.data
    }catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

export const getPopularMovies=async(page=1)=>
    handleRequest(axiosMovieInstance.get(`/movie/popular`,{params:{page}}))


export const searchMovies=async(query,page=1)=>
    handleRequest(axiosMovieInstance.get(`/search/movie`,{params:{query,page}}))


export const getGenres=async()=>
    handleRequest(axiosMovieInstance.get(`/genre/movie/list`))


export const discoverMovies=async({genre,sortBy="popularity.desc",page=1}={})=>
    handleRequest(
        axiosMovieInstance.get(`/discover/movie`,{
            params:{
                with_genres:genre || undefined,
                sort_by:sortBy,
                page,
                // Avoid obscure titles dominating the "Top Rated" sort
                ...(sortBy.startsWith("vote_average")
                    ? { "vote_count.gte": 200 }
                    : {}),
            },
        })
    )


export const getMoviesDetails=async(id)=>
    handleRequest(
        axiosMovieInstance.get(`/movie/${id}`,{
            params:{append_to_response:"credits,videos"},
        })
    )


export const getRecommendations =async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}/recommendations`))


export const getMovieVideos =async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}/videos`))


