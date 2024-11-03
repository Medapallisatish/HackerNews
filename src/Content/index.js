import "./index.css"

const Content=props=>{
    const {Details}= props
    const {created_at, num_comments, points, title, url, author, updated_at, objectId}= Details

    const createdDate=new Date(created_at)

    const updatedDate=new Date(updated_at)

    const diff=updatedDate-createdDate

    const diffYears=Math.ceil(diff/ (1000*60*60*24*365.25))


    return(
        <div className="content">
            <div className="link-container">
            <h3>{title}</h3>
            <a href={url} className="url"><p className="link">({url})</p></a>
            </div>
    
            <a href={points} className="points"><span className="span-points">{points} points</span></a>
            <span className="dash">|</span>
           <a href ={author} className="points"><span className="span-points">{author}</span></a> 
           <span className="dash">|</span>

            <a href={diffYears} className="points"><span className="span-points">{diffYears} years</span></a>
            <span className="dash">|</span>

           <a href={num_comments} className="points"> <span className="span-points">{num_comments} comments</span></a>
        </div>

    )
}
export default Content