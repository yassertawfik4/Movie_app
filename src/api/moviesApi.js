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

export const getMoviesDetails=async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}`))


export const getRecommendations =async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}/recommendations`))


export const getMovieVideos =async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}/videos`))

export const getMovieCredits =async(id)=>
    handleRequest(axiosMovieInstance.get(`/movie/${id}/credits`))


