import bcrypt from "bcryptjs"

export const hashData=({plaintext , salt=8})=>{
    const hash_plaintext = bcrypt.hashSync(plaintext , parseInt(salt))
    return hash_plaintext
}



export const compareData=({plaintext , hashValue})=>{
    const compare = bcrypt.compareSync(plaintext ,hashValue)
    return compare
}