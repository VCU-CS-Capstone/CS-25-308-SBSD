import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
    text: string;
    fromBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({text, fromBot}) => {
    const botStyle = {
        background: fromBot ? 'DarkGrey' : 'AliceBlue',
        alignItems: fromBot ? 'start' : 'start',
        alignSelf: fromBot ? 'start' : 'end'
    }

    return(
        <div className="max-w-[85%] h-min p-4 border-zinc-800 border-2 rounded flex flex-col justify-center text-clip" style={botStyle}>
            <Markdown 
                className="w-[100%] text-black"
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.5em', marginBottom: '0.75rem' }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ fontSize: '2em', marginBottom: '0.6rem' }} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.75em', marginBottom: '0.5rem' }} {...props} />,
                    h4: ({ node, ...props }) => <h4 style={{ fontSize: '1.5em', marginBottom: '0.4rem' }} {...props} />,
                    h5: ({ node, ...props }) => <h5 style={{ fontSize: '1.25em', marginBottom: '0.3rem' }} {...props} />,
                    h6: ({ node, ...props }) => <h6 style={{ fontSize: '1em', marginBottom: '0.2rem' }} {...props} />,
                    ol: ({ node, ...props }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} {...props} />,
                }}
            >
                {text}
            </Markdown>
        </div>
    );
};

export default ChatMessage;