
const Description = (props) => {
  return (
    <div>
        <p className="text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis veniam voluptatibus in hic placeat doloremque?</p>

        <button style={{backgroundColor: props.color}} className="mt-10 ml-8 text-white text-[1.2em] font-semibold px-8 py-2 rounded-full cursor-pointer tracking-wider">{props.btn}</button>
    </div>
  )
}

export default Description