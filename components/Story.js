function Story({img,username}) {
    return (
        <div>
            <img className="rounded-full h-14 w-14 p-[1.5px] border-red-500 border-2 object-contain cursor-pointer transition ease-out  hover:scale-110" src={img} alt="" />
            <p className="text-xs text-center truncate w-14 ">{username}</p>
        </div>
    )
}

export default Story
