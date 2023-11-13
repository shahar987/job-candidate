const Candidate = require("../models/candidateModel");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');
const pagination = require('../utils/pagination')

exports.getCandidate = catchAsync(async (req, res, next) => {
    const candidateId = req.params.id
    const candidate = await Candidate.findByPk(candidateId)

    if(!candidate){
        return next(new AppError('candidate does not exist', 404));
    }
    
    res.status(200).json({success: true, candidate})
})


exports.getAllCandidates = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 

    const offset = (page - 1) * limit;
    const candidates = await Candidate.findAndCountAll({
        offset,
        limit,
      });
  
    const totalCandidates = candidates.count;
    const totalPages = Math.ceil(totalCandidates / limit);
    url = 'http://localhost:8080/api/candidates'
    
    res.status(200).json({
        success: true,
        candidates: candidates.rows,
        currentPage: page,
        nextPage: pagination.getNextPage(totalPages, page, limit, url),
        prevPage: pagination.getPrevPage(page, limit, url),
        totalPages: totalPages,
    });
    
  });