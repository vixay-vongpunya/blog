

// function MainRecommendation(){
//     return(
//         <BigBlogCard key={posts[0].id} post={posts[0]} />
//                     <Stack justifyContent='space-between'>
//                         {posts.slice(1,4).map((post)=>(
//                         <Card 
//                             key={post.id}
//                             elevation={0}
//                             sx={{ 
//                                 display: 'flex', 
//                                 height: 150,
//                                 borderRadius: 0,
//                                 cursor: 'pointer',
//                                 backgroundColor: 'transparent'}} 
//                             onClick={()=>onClickPost(post.id, post.title)}>
//                             <Box display='flex' sx={{gap: '0.8em'}}>
//                                 <CardMedia 
//                                     component='img'
//                                     image='./../person.jpg'
//                                     sx={{ width: 150}}/>
//                                 <Stack justifyContent='space-between'>
//                                     <CardContent  sx={{display: "flex", flexDirection: "column", gap:1, paddingTop:0}}>
//                                         <Typography variant="h5" sx={{
//                                             display: "-webkit-box",
//                                             WebkitBoxOrient: "vertical",
//                                             overflow: "hidden",
//                                             WebkitLineClamp: 1,
//                                         }}>{post.title}</Typography>
//                                         <Stack 
//                                             direction='row' 
//                                             sx={{ gap: '0.5em', alignItems: 'center' }}
//                                             onClick={(event)=>onClickProfile(event, post.author)}>
//                                                 <ProfileImage size='tiny' path={post.author.name} alt={post.image}/>
//                                                 <Typography variant='body2' color='textSecondary'>{post.author.name} &middot; {post.createdAt}</Typography>
//                                         </Stack>
//                                         {/* need to work on here */}
//                                         <Typography sx={{
//                                             color: 'text.secondary',
//                                             display: "-webkit-box",
//                                             WebkitBoxOrient: "vertical",
//                                             overflow: "hidden",
//                                             WebkitLineClamp: 2,
//                                         }}>{post.preview}</Typography>     
//                                     </CardContent>
//                                     <CardActions sx={{justifyContent: 'space-between'}}>
//                                         <PostCardFooter 
//                                             savedPost={post.savedPost}
//                                             categories={post.categories} 
//                                             onClickCategory={(event, category)=>onClickCategory(event, category)} 
//                                             onClickSave={(event)=>onClickSave(event, post.id, post.savedPost, queryKey.postsByCategory(categoryId))}/>
//                                     </CardActions>
//                                 </Stack>                  
//                             </Box>
//                         </Card>
//                     ))}
//                     </Stack>
//     )
// }

// export default MainRecommendation;