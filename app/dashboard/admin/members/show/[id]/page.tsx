import Content from './content'


interface ShowMemberProps {
  params: {
    id: string;
  };
}


export default function page({params: {id}}: ShowMemberProps) {
  return (
    <>
    <Content id={id} />
    </>
  )
}
