type pageProps = {
  params: {
    typedetailslug: string;
  };
};

const ExerciseDetail = ({ params }: pageProps) => {
  const query = params.typedetailslug;
  return <div>ExerciseDetail</div>;
};
export default ExerciseDetail;
