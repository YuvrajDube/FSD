function checkVoteEligibility(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Eligible to vote ✅");
    } else {
      reject("Not eligible to vote ❌");
    }
  });
}

checkVoteEligibility(20)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
