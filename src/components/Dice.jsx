import { nanoid } from "nanoid"
const Dice = (props) => {
    const styles = {
        backgroundColor : props.isHeld ? '#59E391' : 'white'
    }

    const gridStyle = () => {
        if((props.value) % 3 == 0) {
            return {
                gridTemplateColumns : 'repeat(3, 1fr)'
            }
        } else if((props.value) % 2 == 0 || props.value == 5) {
            return {
                gridTemplateColumns : `repeat(2, 1fr)`
            }
        } else {
            return {
                gridTemplateColumns : `auto`
            }
        }
    }

    const getDot = () => {
      const arr = []
      for (let index = 0; index < props.value; index++) {
        arr.push({
            id : nanoid()
        })
      }
      return arr
    }

    return (
        <div className="dice" style={styles} onClick={props.handleClick}>
            <div className="dot-container" style={gridStyle()}>
                {getDot().map(item => <div className="dot" key={item.id}></div>)}
            </div>
        </div>
    );
}
 
export default Dice;