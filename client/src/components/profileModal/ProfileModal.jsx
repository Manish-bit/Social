import { Modal, useMantineTheme } from '@mantine/core';

function ProfieModal({modalOpened, setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
            <input type="text" className="infoInput" name='Firstname' placeholder='FirstName' />
            <input type="text" className="infoInput" name='Lastname' placeholder='LastName' />
        </div>

        <div>
        <input type="text" className="infoInput" name='worksat' placeholder='Works At' />
        </div>

        <div>
        <input type="text" className="infoInput" name='livesin' placeholder='Lives In' />
        <input type="text" className="infoInput" name='country' placeholder='Country' />
        </div>

        <div>
        <input type="text" className="infoInput" name='relationship' placeholder='Relationship Status' /> 
        </div>

        <div>
            Profile Image
            <input type="file" name="profileImg"  />
            Cover Image
            <input type="file" name="coverImg" />
        </div>

        <button className='button infoButton'>Update</button>
      </form>
    </Modal>
  );
}

export default ProfieModal;