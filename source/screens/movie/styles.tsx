import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #777;
`;

export const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    resize-mode: cover;
`

export const MovieTitle = styled.Text`
    color: white;
    font-size: 18px;
    margin-top: 16px;
    font-weight: bold;
`

export const Genre = styled.Text`
    background-color: tomato;
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 4px;
    margin-top: 8px;
    border-radius: 10px;
    color: white;
    font-size: 10px;
    font-weight: bold;
`

export const Poster = styled.Image`
    width: 150px;
    height: 220px;
    resize-mode: cover;
    border-radius: 10px;
    background-color: #222;
`

export const ActorContainer = styled.View`
    flex-direction: row; 
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`

export const Actor = styled.Image`
    width: 80px;
    height: 80px;
    resize-mode: cover;
    border-radius: 10px;
    background-color: #222;
`