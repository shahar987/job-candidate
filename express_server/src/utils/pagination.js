exports.getNextPage = (totalPages, currentPage, limit, url) =>{
    if(totalPages === currentPage){
        return null
    }
    else{
        return `${url}/?page=${currentPage + 1}&limit=${limit}`
    }
}

exports.getPrevPage = (currentPage, limit, url) =>{
    if(currentPage === 1){
        return null
    }
    else{
        return `${url}/?page=${currentPage - 1}&limit=${limit}`
    }
}