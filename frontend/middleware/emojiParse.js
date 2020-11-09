
const emojiParse = cuisines => {
  const arrayOfCuisines = cuisines.split(", ")
  let emojiCuisines = []
  for(let cuisine of arrayOfCuisines) {
    if(cuisine === "Czech") {
      emojiCuisines.push('🇨🇿')
    } else if(cuisine === "American") {
      emojiCuisines.push('🇺🇸')
    } else if(cuisine === "Italian") {
      emojiCuisines.push('🇮🇹')
    } else if(cuisine === "Arabian") {
      emojiCuisines.push('🐪')
    } else if(cuisine === "Asian") {
      emojiCuisines.push('🥢')
    } else if(cuisine === "BBQ") {
      emojiCuisines.push('🍖')
    } else if(cuisine === "Brazilian") {
      emojiCuisines.push('🇧🇷')
    } else if(cuisine === "British") {
      emojiCuisines.push('🇬🇧')
    } else if(cuisine === "Burger") {
      emojiCuisines.push('🍔')
    } else if(cuisine === "Cafe") {
      emojiCuisines.push('☕')
    } else if(cuisine === "Chinese") {
      emojiCuisines.push('🇨🇳')
    } else if(cuisine === "Desserts") {
      emojiCuisines.push('🍰')
    } else if(cuisine === "Fast Food") {
      emojiCuisines.push('🍟')
    } else if(cuisine === "German") {
      emojiCuisines.push('🇩🇪')
    } else if(cuisine === "Greek") {
      emojiCuisines.push('🇬🇷')
    } else if(cuisine === "Healthy Food") {
      emojiCuisines.push('🥗')
    } else if(cuisine === "Hungarian") {
      emojiCuisines.push('🇭🇺')
    } else if(cuisine === "Indian") {
      emojiCuisines.push('🇮🇳')
    } else if(cuisine === "Japanese") {
      emojiCuisines.push('🇯🇵')
    } else if(cuisine === "Kebab") {
      emojiCuisines.push('🍢')
    } else if(cuisine === "Korean") {
      emojiCuisines.push('🇰🇷')
    } else if(cuisine === "Lebanese") {
      emojiCuisines.push('🇱🇧')
    } else if(cuisine === "Mediterranean") {
      emojiCuisines.push('🌊')
    } else if(cuisine === "Mexican") {
      emojiCuisines.push('🇲🇽')
    } else if(cuisine === "Polish") {
      emojiCuisines.push('🇵🇱')
    } else if(cuisine === "Russian") {
      emojiCuisines.push('🇷🇺')
    } else if(cuisine === "Seafood") {
      emojiCuisines.push('🦑')
    } else if(cuisine === "Slovak") {
      emojiCuisines.push('🇸🇰')
    } else if(cuisine === "Spanish") {
      emojiCuisines.push('🇪🇸')
    } else if(cuisine === "Sushi") {
      emojiCuisines.push('🍣')
    } else if(cuisine === "Tapas") {
      emojiCuisines.push('🥘')
    } else if(cuisine === "Thai") {
      emojiCuisines.push('🇹🇭')
    } else if(cuisine === "Turkish") {
      emojiCuisines.push('🇹🇷')
    } else if(cuisine === "Ukrainian") {
      emojiCuisines.push('🇺🇦')
    } else if(cuisine === "Vegetarian") {
      emojiCuisines.push('🥬')
    } else if(cuisine === "Vietnamese") {
      emojiCuisines.push('🇻🇳')
    } else if(cuisine === "Pizza") {
      emojiCuisines.push('🍕')
    } else if(cuisine === "Grill") {
      emojiCuisines.push('🥩')
    } else {
      emojiCuisines.push('🍴')
    }
  }
  return emojiCuisines
}

export { emojiParse }